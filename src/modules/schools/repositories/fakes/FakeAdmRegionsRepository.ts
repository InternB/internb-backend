import { v4 } from 'uuid';

import AdmRegion from '@modules/schools/infra/typeorm/entities/AdmRegion';
import IAdmRegionsRepository from '../IAdmRegionsRepository';
import ICreateAdmRegionDTO from '../../dtos/ICreateAdmRegionDTO';

export default class FakeAdmRegionsRepository implements IAdmRegionsRepository {
  private AdmRegions: AdmRegion[] = [];

  public async create(data: ICreateAdmRegionDTO): Promise<AdmRegion> {
    const admRegion = new AdmRegion();

    Object.assign(admRegion, {
      id: v4(),
      ...data,
      created_at: Date.now(),
      updated_at: Date.now(),
    });

    this.AdmRegions.push(admRegion);

    return admRegion;
  }

  public async findById(id: string): Promise<AdmRegion | undefined> {
    const findId = this.AdmRegions.find(adm_region => adm_region.id === id);

    return findId;
  }

  public async findAllRegions(): Promise<AdmRegion[]> {
    return this.AdmRegions;
  }

  public async findAllRegionsOfType(cre: boolean): Promise<AdmRegion[]> {
    const regionsOfType = this.AdmRegions.filter(region => region.cre === cre);

    return regionsOfType;
  }
}
