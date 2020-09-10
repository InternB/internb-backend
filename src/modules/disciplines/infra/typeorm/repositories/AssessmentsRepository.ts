import { getRepository, Repository } from 'typeorm';

import ICreateAssessmentDTO from '@modules/disciplines/dtos/ICreateAssessmentDTO';
import IAssessmentsRepository from '../../../repositories/IAssessmentsRepository';
import Assessment from '../entities/Assessment';

export default class AssessmentsRepository implements IAssessmentsRepository {
  private ormRepository: Repository<Assessment>;

  constructor() {
    this.ormRepository = getRepository(Assessment);
  }

  public async create(data: ICreateAssessmentDTO): Promise<Assessment> {
    let assessment = new Assessment();
    Object.assign(assessment, data);

    assessment = this.ormRepository.create(assessment);
    await this.save(assessment);

    return assessment;
  }

  public async save(assessment: Assessment): Promise<Assessment> {
    return this.ormRepository.save(assessment);
  }
}
