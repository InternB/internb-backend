import SchoolManager from '../infra/typeorm/entities/SchoolManager';

import ICreateSchoolManagerDTO from '../dtos/ICreateSchoolManagerDTO';

export default interface ISchoolManagersRepository {
  create(data: ICreateSchoolManagerDTO): Promise<SchoolManager>;
}
