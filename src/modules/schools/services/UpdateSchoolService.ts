import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import School from '../infra/typeorm/entities/School';
import ISchoolsRepository from '../repositories/ISchoolsRepository';
import IAdmRegionsRepository from '../repositories/IAdmRegionsRepository';

interface IRequest {
  id: string;
  name: string;
  adm_region_id: string;
  cep: string;
  address: string;
  phone?: string;
  email?: string;
}

@injectable()
class UpdateSchoolService {
  constructor(
    @inject('SchoolsRepository')
    private schoolsRepository: ISchoolsRepository,

    @inject('AdmRegionsRepository')
    private admRegionsRepository: IAdmRegionsRepository,
  ) {}

  public async execute({
    id,
    name,
    adm_region_id,
    cep,
    address,
    phone,
    email,
  }: IRequest): Promise<School> {
    const adm_region = await this.admRegionsRepository.findById(adm_region_id);

    if (!adm_region)
      throw new AppError('Adminstrative Region does not exist', 400);

    const school = await this.schoolsRepository.findById(id);

    if (!school) throw new AppError('School does not exist', 404);

    Object.assign(school, {
      name,
      adm_region_id,
      cep,
      address,
      phone,
      email,
      updated_at: new Date(),
    });

    const updatedSchool = await this.schoolsRepository.save(school);
    return updatedSchool;
  }
}

export default UpdateSchoolService;
