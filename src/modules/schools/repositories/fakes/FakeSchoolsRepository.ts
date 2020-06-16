import { uuid } from 'uuidv4';

import School from '@modules/schools/infra/typeorm/entities/School';
import ISchoolsRepository from '../ISchoolsRepository';
import ICreateSchoolDTO from '../../dtos/ICreateSchoolDTO';

export default class FakeSchoolsRepository implements ISchoolsRepository {
  private schools: School[] = [];

  public async create(data: ICreateSchoolDTO): Promise<School> {
    const school = new School();

    Object.assign(school, {
      id: uuid(),
      ...data,
      created_at: Date.now(),
      updated_at: Date.now(),
    });

    this.schools.push(school);

    return school;
  }

  public async findById(id: string): Promise<School | undefined> {
    const findId = this.schools.find(school => school.id === id);

    return findId;
  }
}
