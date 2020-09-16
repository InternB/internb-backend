import ICreateRealiationDTO from '../dtos/ICreateRealizationDTO';
import Realization from '../infra/typeorm/entities/Realization';

export default interface IRealizationsRepository {
  create(data: ICreateRealiationDTO): Promise<Realization>;
  save(realization: Realization): Promise<Realization>;
}
