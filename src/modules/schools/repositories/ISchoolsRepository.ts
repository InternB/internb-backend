import School from '../infra/typeorm/entities/School';

import ICreateSchoolDTO from '../dtos/ICreateSchoolDTO';

export default interface ISchoolsRepository {
  create(data: ICreateSchoolDTO): Promise<School>;
  findById(id: string): Promise<School | undefined>;
}
