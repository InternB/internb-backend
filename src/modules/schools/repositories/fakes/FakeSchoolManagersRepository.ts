import { uuid } from 'uuidv4';

import SchoolManager from '@modules/schools/infra/typeorm/entities/SchoolManager';

import ICreateSchoolManagerDTO from '../../dtos/ICreateSchoolManagerDTO';
import ISchoolManagersRepository from '../ISchoolManagersRepository';

export default class FakeSchoolManagersRepository
  implements ISchoolManagersRepository {
  private managers: SchoolManager[] = [];

  public async create({
    role,
    fullname,
    phone,
    email,
    school_id,
  }: ICreateSchoolManagerDTO): Promise<SchoolManager> {
    const school_manager = new SchoolManager();

    Object.assign(school_manager, {
      id: uuid(),
      role,
      fullname,
      phone,
      email,
      school_id,
      created_at: Date.now(),
      updated_at: Date.now(),
    });

    this.managers.push(school_manager);

    return school_manager;
  }

  public async save(schoolManager: SchoolManager): Promise<SchoolManager> {
    const idx = this.managers.findIndex(
      manager => manager.id === schoolManager.id,
    );

    this.managers[idx] = schoolManager;

    return schoolManager;
  }

  public async findById(id: string): Promise<SchoolManager | undefined> {
    const schoolManager = this.managers.find(manager => manager.id === id);

    return schoolManager;
  }
}
