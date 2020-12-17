import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
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
  ) {}

  public async execute({
    internship_id,
    compromise,
  }: IRequest): Promise<Internship> {
    const internship = await this.internshipsRepository.findById(internship_id);

    if (!internship) throw new AppError('Internship not found', 404);

    if (internship.compromise)
      throw new AppError('Internship already has a compromise file');

    internship.compromise = compromise;
    await this.internshipsRepository.save(internship);

    return internship;
  }
}

export default UploadInternCompromiseService;
