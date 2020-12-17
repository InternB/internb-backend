import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IInternshipsRepository from '../repositories/IInternshipsRepository';
import Internship from '../infra/typeorm/entities/Internship';

interface IRequest {
  internship_id: string;
  first_copy: string;
  second_copy: string;
  third_copy: string;
}

@injectable()
class UploadInternContractFilesService {
  constructor(
    @inject('InternshipsRepository')
    private internshipsRepository: IInternshipsRepository,
  ) {}

  public async execute({
    internship_id,
    first_copy,
    second_copy,
    third_copy,
  }: IRequest): Promise<Internship> {
    let internship = await this.internshipsRepository.findById(internship_id);

    if (!internship) throw new AppError('Internship does not exist', 404);

    if (internship.contract_files)
      throw new AppError('Internship already has uploaded contract files', 400);

    internship.contract_files = [first_copy, second_copy, third_copy];

    internship = await this.internshipsRepository.save(internship);

    return internship;
  }
}

export default UploadInternContractFilesService;
