import { v4 } from 'uuid';

import ICreateRealiationDTO from '@modules/disciplines/dtos/ICreateRealizationDTO';
import Realization from '@modules/disciplines/infra/typeorm/entities/Realization';
import IRealizationsRepository from '../IRealizationsRepository';

class FakeRealizationsRepository implements IRealizationsRepository {
  private realizations: Realization[] = [];

  public async create(data: ICreateRealiationDTO): Promise<Realization> {
    const realization = new Realization();
    Object.assign(realization, {
      id: v4(),
      ...data,
    });

    this.realizations.push(realization);

    return realization;
  }

  public async save(realization: Realization): Promise<Realization> {
    const idx = this.realizations.findIndex(x => x.id === realization.id);

    this.realizations[idx] = realization;

    return realization;
  }
}

export default FakeRealizationsRepository;
