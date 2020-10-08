import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import School from '../infra/typeorm/entities/School';
import ISchoolsRepository from '../repositories/ISchoolsRepository';
import IAdmRegionsRepository from '../repositories/IAdmRegionsRepository';

interface IRequest {
  adm_region_id: string;
}

@injectable()
class ListSchoolsRegionService {
  constructor(
    @inject('SchoolsRepository')
    private schoolsRepository: ISchoolsRepository,

    @inject('AdmRegionsRepository')
    private admRegionsRepository: IAdmRegionsRepository,
  ) {}

  public async execute({ adm_region_id }: IRequest): Promise<School[]> {
    const adm_region = await this.admRegionsRepository.findById(adm_region_id);

    if (!adm_region) throw new AppError('Adminstrative Region does not exist');

    const schools = await this.schoolsRepository.findAllSchoolsRegion(
      adm_region_id,
    );

    return schools;
  }
}

export default ListSchoolsRegionService;
