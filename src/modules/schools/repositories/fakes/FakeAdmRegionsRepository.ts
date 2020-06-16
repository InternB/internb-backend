import { uuid } from 'uuidv4';

import AdmRegion from '@modules/schools/infra/typeorm/entities/AdmRegion';
import IAdmRegionsRepository from '../IAdmRegionsRepository';
import ICreateAdmRegionDTO from '../../dtos/ICreateAdmRegionDTO';

export default class FakeAdmRegionsRepository implements IAdmRegionsRepository {
  private AdmRegions: AdmRegion[] = [];

  public async create(data: ICreateAdmRegionDTO): Promise<AdmRegion> {
    const admRegion = new AdmRegion();

    Object.assign(admRegion, {
      id: uuid(),
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
}
