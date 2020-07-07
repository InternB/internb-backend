import { getRepository, Repository } from 'typeorm';

import SchoolManager from '../entities/SchoolManager';

import ICreateSchoolManagerDTO from '../../../dtos/ICreateSchoolManagerDTO';
import ISchoolManagersRepository from '../../../repositories/ISchoolManagersRepository';

export default class SchoolManagersRepository
  implements ISchoolManagersRepository {
  private ormRepository: Repository<SchoolManager>;

  constructor() {
    this.ormRepository = getRepository(SchoolManager);
  }

  public async create({
    role,
    fullname,
    phone,
    email,
    school_id,
  }: ICreateSchoolManagerDTO): Promise<SchoolManager> {
    const school_manager = this.ormRepository.create({
      role,
      fullname,
      phone,
      email,
      school_id,
    });

    await this.ormRepository.save(school_manager);

    return school_manager;
  }

  public async save(schoolManager: SchoolManager): Promise<SchoolManager> {
    const updatedSchoolManager = await this.ormRepository.save(schoolManager);

    return updatedSchoolManager;
  }

  public async findById(id: string): Promise<SchoolManager | undefined> {
    const schoolManager = await this.ormRepository.findOne({ where: { id } });

    return schoolManager;
  }
}
