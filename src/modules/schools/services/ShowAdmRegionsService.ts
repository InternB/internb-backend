import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAdmRegionsRepository from '../repositories/IAdmRegionsRepository';
import AdmRegion from '../infra/typeorm/entities/AdmRegion';

interface IRequest {
  region_filter?: string;
}

@injectable()
class ShowAdmRegionsService {
  constructor(
    @inject('AdmRegionsRepository')
    private admRegionsRepository: IAdmRegionsRepository,
  ) {}

  public async execute({ region_filter }: IRequest): Promise<AdmRegion[]> {
    let regions: AdmRegion[] = [];

    if (region_filter) {
      if (region_filter !== 'cre' && region_filter !== 'other')
        throw new AppError('Invalid filter value');

      const cre = region_filter === 'cre';

      regions = await this.admRegionsRepository.findAllRegionsOfType(cre);
    } else {
      regions = await this.admRegionsRepository.findAllRegions();
    }

    return regions;
  }
}

export default ShowAdmRegionsService;
