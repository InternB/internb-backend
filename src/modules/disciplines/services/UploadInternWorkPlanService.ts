import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IInternshipsRepository from '../repositories/IInternshipsRepository';
import Internship from '../infra/typeorm/entities/Internship';

interface IRequest {
  internship_id: string;
  work_plan: string;
}

@injectable()
class UploadInternWorkPlanService {
  constructor(
    @inject('InternshipsRepository')
    private internshipsRepository: IInternshipsRepository,
  ) {}

  public async execute({
    internship_id,
    work_plan,
  }: IRequest): Promise<Internship> {
    let internship = await this.internshipsRepository.findById(internship_id);

    if (!internship) throw new AppError('Internship does not exist', 404);

    if (internship.work_plan)
      throw new AppError('Internship already has a work plan', 400);

    internship.work_plan = work_plan;
    internship = await this.internshipsRepository.save(internship);

    return internship;
  }
}

export default UploadInternWorkPlanService;
