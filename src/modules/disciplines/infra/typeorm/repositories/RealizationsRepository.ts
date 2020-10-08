import { Repository, getRepository } from 'typeorm';

import IRealizationsRepository from '@modules/disciplines/repositories/IRealizationsRepository';
import ICreateRealizationDTO from '@modules/disciplines/dtos/ICreateRealizationDTO';
import Realization from '../entities/Realization';

class RealizationsRepository implements IRealizationsRepository {
  private ormRepository: Repository<Realization>;

  constructor() {
    this.ormRepository = getRepository(Realization);
  }

  public async create(data: ICreateRealizationDTO): Promise<Realization> {
    let realization = new Realization();
    Object.assign(realization, data);

    realization = this.ormRepository.create(realization);
    await this.save(realization);

    return realization;
  }

  public async save(realization: Realization): Promise<Realization> {
    return this.ormRepository.save(realization);
  }
}

export default RealizationsRepository;
