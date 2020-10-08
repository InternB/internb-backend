import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/model/IStorageProvider';
import IInternshipsRepository from '../repositories/IInternshipsRepository';
import Internship from '../infra/typeorm/entities/Internship';

interface IRequest {
  internship_id: string;
  compromise: string;
}

@injectable()
class UploadInternCompromiseService {
  constructor(
    @inject('InternshipsRepository')
    private internshipsRepository: IInternshipsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    internship_id,
    compromise,
  }: IRequest): Promise<Internship> {
    const internship = await this.internshipsRepository.findById(internship_id);

    if (!internship || internship.compromise)
      await this.storageProvider.deleteTmpFiles([compromise]);

    if (!internship) throw new AppError('Internship not found', 404);

    if (internship.compromise)
      throw new AppError('Internship already has a compromise');

    const uploadedCompromise = await this.storageProvider.saveFile(compromise);
    internship.compromise = uploadedCompromise;
    await this.internshipsRepository.save(internship);

    return internship;
  }
}

export default UploadInternCompromiseService;
