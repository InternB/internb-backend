import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Realization from '../infra/typeorm/entities/Realization';
import IInternshipsRepository from '../repositories/IInternshipsRepository';
import IRealizationsRepository from '../repositories/IRealizationsRepository';

interface IRequest {
  internship_id: string;
  type: number;
  names: string[];
}

@injectable()
class CreateRealizationOfInternshipService {
  constructor(
    @inject('InternshipsRepository')
    private internshipsRepository: IInternshipsRepository,

    @inject('RealizationsRepository')
    private realizationsRepository: IRealizationsRepository,
  ) {}

  public async execute({
    internship_id,
    type,
    names,
  }: IRequest): Promise<Realization> {
    const internship = await this.internshipsRepository.findById(internship_id);
    if (!internship) throw new AppError('Internship not found', 404);
    if (internship.realization_id)
      throw new AppError('Internship already has a realization', 400);

    if (type === 2 && names.length === 0)
      throw new AppError("'in group' select, but no names given", 400);

    const realization = await this.realizationsRepository.create({
      type,
      names,
    });

    internship.realization_id = realization.id;
    await this.internshipsRepository.save(internship);

    return realization;
  }
}

export default CreateRealizationOfInternshipService;
