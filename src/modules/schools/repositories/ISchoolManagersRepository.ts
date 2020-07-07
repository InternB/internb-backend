import SchoolManager from '../infra/typeorm/entities/SchoolManager';

import ICreateSchoolManagerDTO from '../dtos/ICreateSchoolManagerDTO';

export default interface ISchoolManagersRepository {
  create(data: ICreateSchoolManagerDTO): Promise<SchoolManager>;
  save(schoolManager: SchoolManager): Promise<SchoolManager>;
  findById(id: string): Promise<SchoolManager | undefined>;
}
