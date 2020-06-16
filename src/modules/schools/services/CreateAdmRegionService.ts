import { inject, injectable } from 'tsyringe';

import AdmRegion from '../infra/typeorm/entities/AdmRegion';
import IAdmRegionsRepository from '../repositories/IAdmRegionsRepository';

interface IRequest {
  name: string;
  cre: boolean;
}

@injectable()
class CreateAdmRegionService {
  constructor(
    @inject('AdmRegionsRepository')
    private admRegionsRepository: IAdmRegionsRepository,
  ) {}

  public async execute({ name, cre }: IRequest): Promise<AdmRegion> {
    const adm_region = await this.admRegionsRepository.create({ name, cre });

    return adm_region;
  }
}

export default CreateAdmRegionService;
