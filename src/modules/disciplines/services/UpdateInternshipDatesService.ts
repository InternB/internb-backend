import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IInternshipsRepository from '../repositories/IInternshipsRepository';
import Internship from '../infra/typeorm/entities/Internship';

interface IRequest {
  id: string;
  begins: number;
  ends: number;
}

@injectable()
class UpdateInternshipDatesService {
  constructor(
    @inject('InternshipsRepository')
    private internshipsRepository: IInternshipsRepository,
  ) {}

  public async execute({ id, begins, ends }: IRequest): Promise<Internship> {
    const internship = await this.internshipsRepository.findById(id);
    if (!internship) throw new AppError('Internship not found', 404);

    internship.begins_at = new Date(begins);
    internship.finishes_at = new Date(ends);

    this.internshipsRepository.save(internship);

    return internship;
  }
}

export default UpdateInternshipDatesService;
