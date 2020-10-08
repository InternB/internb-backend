import { v4 } from 'uuid';

import ICreateAssessmentDTO from '@modules/disciplines/dtos/ICreateAssessmentDTO';
import Assessment from '@modules/disciplines/infra/typeorm/entities/Assessment';
import IAssessmentsRepository from '../IAssessmentsRepository';

export default class FakeAssessmentsRepository
  implements IAssessmentsRepository {
  private assessments: Assessment[] = [];

  public async create(data: ICreateAssessmentDTO): Promise<Assessment> {
    const assessment = new Assessment();
    Object.assign(assessment, {
      id: v4(),
      ...data,
    });

    this.assessments.push(assessment);

    return assessment;
  }
}
