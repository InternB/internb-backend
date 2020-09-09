import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStorageProvider from '@shared/container/providers/StorageProvider/model/IStorageProvider';
import IInternshipsRepository from '../repositories/IInternshipsRepository';
import Internship from '../infra/typeorm/entities/Internship';

interface IRequest {
  internship_id: string;
  firstCopy: string;
  secondCopy: string;
  thirdCopy: string;
}

@injectable()
class UploadInternContractFilesService {
  constructor(
    @inject('InternshipsRepository')
    private internshipsRepository: IInternshipsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    internship_id,
    firstCopy,
    secondCopy,
    thirdCopy,
  }: IRequest): Promise<Internship> {
    let internship = await this.internshipsRepository.findById(internship_id);

    if (!internship || internship.contract_files)
      this.storageProvider.deleteTmpFiles([firstCopy, secondCopy, thirdCopy]);

    if (!internship) throw new AppError('Internship does not exist', 404);

    if (internship.contract_files)
      throw new AppError('Internship already has uploaded contract files', 400);

    const contractFiles = await this.storageProvider.saveFiles([
      firstCopy,
      secondCopy,
      thirdCopy,
    ]);

    internship.contract_files = contractFiles;

    internship = await this.internshipsRepository.save(internship);

    return internship;
  }
}

export default UploadInternContractFilesService;
