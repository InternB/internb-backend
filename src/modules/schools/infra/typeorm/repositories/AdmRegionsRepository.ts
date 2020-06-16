import { getRepository, Repository } from 'typeorm';

import AdmRegion from '../entities/AdmRegion';

import ICreateAdmRegionDTO from '../../../dtos/ICreateAdmRegionDTO';
import IAdmRegionsRepository from '../../../repositories/IAdmRegionsRepository';

export default class AdmRegionsRepository implements IAdmRegionsRepository {
  private ormRepository: Repository<AdmRegion>;

  constructor() {
    this.ormRepository = getRepository(AdmRegion);
  }

  public async create({ name, cre }: ICreateAdmRegionDTO): Promise<AdmRegion> {
    const adm_region = this.ormRepository.create({ name, cre });

    await this.ormRepository.save(adm_region);

    return adm_region;
  }

  public async findById(id: string): Promise<AdmRegion | undefined> {
    const findId = await this.ormRepository.findOne({ where: { id } });

    return findId;
  }
}
