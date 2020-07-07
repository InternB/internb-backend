import AdmRegion from '../infra/typeorm/entities/AdmRegion';

import ICreateAdmRegionDTO from '../dtos/ICreateAdmRegionDTO';

export default interface IAdmRegionsRepository {
  create(data: ICreateAdmRegionDTO): Promise<AdmRegion>;
  findById(id: string): Promise<AdmRegion | undefined>;
  findAllRegions(): Promise<AdmRegion[]>;
  findAllRegionsOfType(cre: boolean): Promise<AdmRegion[]>;
}
