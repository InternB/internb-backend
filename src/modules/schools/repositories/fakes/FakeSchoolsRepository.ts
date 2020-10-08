import { v4 } from 'uuid';

import School from '@modules/schools/infra/typeorm/entities/School';
import AdmRegion from '@modules/schools/infra/typeorm/entities/AdmRegion';

import ISchoolsRepository from '../ISchoolsRepository';
import ICreateSchoolDTO from '../../dtos/ICreateSchoolDTO';

interface ICreateFakeSchool extends ICreateSchoolDTO {
  adm_region?: AdmRegion;
}

export default class FakeSchoolsRepository implements ISchoolsRepository {
  private schools: School[] = [];

  public async create(data: ICreateFakeSchool): Promise<School> {
    const school = new School();

    Object.assign(school, {
      id: v4(),
      ...data,
      created_at: Date.now(),
      updated_at: Date.now(),
    });

    this.schools.push(school);

    return school;
  }

  public async save(school: School): Promise<School> {
    const idx = this.schools.findIndex(
      storedSchool => storedSchool.id === school.id,
    );

    this.schools[idx] = school;

    return school;
  }

  public async findById(
    id: string,
    eager = false,
  ): Promise<School | undefined> {
    const findId = this.schools.find(school => school.id === id);

    return findId;
  }

  public async findAllSchoolsRegion(
    adm_region_id: string,
    eager = false,
  ): Promise<School[]> {
    const schools = this.schools.filter(
      school => school.adm_region_id === adm_region_id,
    );

    return schools;
  }

  public async getAllSchools(): Promise<School[]> {
    return this.schools;
  }
}
