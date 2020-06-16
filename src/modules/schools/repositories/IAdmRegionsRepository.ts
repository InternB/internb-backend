import AdmRegion from '../infra/typeorm/entities/AdmRegion';

import ICreateAdmRegionDTO from '../dtos/ICreateAdmRegionDTO';

export default interface IAdmRegionsRepository {
  create(data: ICreateAdmRegionDTO): Promise<AdmRegion>;
}
