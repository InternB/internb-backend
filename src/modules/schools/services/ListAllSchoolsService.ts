import { inject, injectable } from 'tsyringe';

import School from '../infra/typeorm/entities/School';
import ISchoolsRepository from '../repositories/ISchoolsRepository';

@injectable()
class ListAllSchoolsService {
  constructor(
    @inject('SchoolsRepository')
    private schoolsRepository: ISchoolsRepository,
  ) {}

  public async execute(): Promise<School[]> {
    const schools = await this.schoolsRepository.getAllSchools();

    return schools;
  }
}

export default ListAllSchoolsService;
