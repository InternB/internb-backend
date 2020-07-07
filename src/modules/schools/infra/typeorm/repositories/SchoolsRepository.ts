import { getRepository, Repository } from 'typeorm';

import School from '../entities/School';

import ICreateSchoolDTO from '../../../dtos/ICreateSchoolDTO';
import ISchoolsRepository from '../../../repositories/ISchoolsRepository';

export default class SchoolsRepository implements ISchoolsRepository {
  private ormRepository: Repository<School>;

  constructor() {
    this.ormRepository = getRepository(School);
  }

  public async create({
    name,
    adm_region_id,
    cep,
    address,
    phone,
    email,
  }: ICreateSchoolDTO): Promise<School> {
    const school = this.ormRepository.create({
      name,
      adm_region_id,
      cep,
      address,
      phone,
      email,
    });

    await this.ormRepository.save(school);

    return school;
  }

  public async save(school: School): Promise<School> {
    const updatedSchool = this.ormRepository.save(school);

    return updatedSchool;
  }

  public async findById(id: string): Promise<School | undefined> {
    const findId = await this.ormRepository.findOne({ where: { id } });

    return findId;
  }

  public async findAllSchoolsRegion(adm_region_id: string): Promise<School[]> {
    const schools = await this.ormRepository.find({ where: { adm_region_id } });

    return schools;
  }

  public async getAllSchools(): Promise<School[]> {
    const schools = await this.ormRepository.find();

    return schools;
  }
}
