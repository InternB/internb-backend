import { inject, injectable } from 'tsyringe';

import IGenericUsersRepository from '@modules/users/repositories/IGenericUsersRepository';
import Preceptor from '@modules/users/infra/typeorm/entities/Preceptor';
import AppError from '@shared/errors/AppError';
import IInternshipsRepository from '../repositories/IInternshipsRepository';
import Assessment from '../infra/typeorm/entities/Assessment';
import IAssessmentsRepository from '../repositories/IAssessmentsRepository';

interface IRequest {
  user_id: string;
  assessment_data: {
    internship_id: string;
    ended: boolean;
    class_plan: number[];
    class_plan_comments?: string;
    content: number[];
    content_comments?: string;
    class_experience: number[];
    class_experience_comments?: string;
    methodology: number[];
    methodology_comments?: string;
    didactic: number[];
    didactic_comments?: string;
    evaluation: number[];
    evaluation_comments?: string;
    communication: number[];
    communication_comments?: string;
    general: number[];
    general_comments?: string;
  };
}

@injectable()
class CreateInternshipAssessmentService {
  constructor(
    @inject('PreceptorsRepository')
    private preceptorsRepository: IGenericUsersRepository<Preceptor>,

    @inject('InternshipsRepository')
    private internshipsRepository: IInternshipsRepository,

    @inject('AssessmentsRepository')
    private assessmentsRepository: IAssessmentsRepository,
  ) {}

  public async execute({
    user_id,
    assessment_data,
  }: IRequest): Promise<Assessment> {
    const preceptor = await this.preceptorsRepository.findUserOfTypeById(
      user_id,
    );
    if (!preceptor) throw new AppError('Preceptor not found', 404);

    const intern = await this.internshipsRepository.findById(
      assessment_data.internship_id,
    );
    if (!intern) throw new AppError('Preceptor not found', 404);
    if (intern.preceptor_id !== preceptor.id)
      throw new AppError('Intern not registered to preceptor', 403);

    const assessment = await this.assessmentsRepository.create(assessment_data);

    return assessment;
  }
}

export default CreateInternshipAssessmentService;
