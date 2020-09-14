import School from '../infra/typeorm/entities/School';

import ICreateSchoolDTO from '../dtos/ICreateSchoolDTO';

export default interface ISchoolsRepository {
  create(data: ICreateSchoolDTO): Promise<School>;
  save(school: School): Promise<School>;
  findById(id: string, eager: boolean): Promise<School | undefined>;
  findAllSchoolsRegion(
    adm_region_id: string,
    eager: boolean,
  ): Promise<School[]>;
  getAllSchools(): Promise<School[]>;
}
