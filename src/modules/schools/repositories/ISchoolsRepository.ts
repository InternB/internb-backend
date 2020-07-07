import School from '../infra/typeorm/entities/School';

import ICreateSchoolDTO from '../dtos/ICreateSchoolDTO';

export default interface ISchoolsRepository {
  create(data: ICreateSchoolDTO): Promise<School>;
  save(school: School): Promise<School>;
  findById(id: string): Promise<School | undefined>;
  findAllSchoolsRegion(adm_region_id: string): Promise<School[]>;
  getAllSchools(): Promise<School[]>;
}
