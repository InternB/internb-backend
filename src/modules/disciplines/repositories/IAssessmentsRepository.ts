import ICreateAssessmentDTO from '../dtos/ICreateAssessmentDTO';
import Assessment from '../infra/typeorm/entities/Assessment';

export default interface IAssessmentsRepository {
  create(data: ICreateAssessmentDTO): Promise<Assessment>;
}
