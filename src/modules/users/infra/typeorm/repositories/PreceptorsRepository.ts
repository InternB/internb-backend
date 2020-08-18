import { getRepository, Repository } from 'typeorm';

import IGenericUsersRepository from '@modules/users/repositories/IGenericUsersRepository';

import Preceptor from '../entities/Preceptor';

export default class PreceptorsRepository
  implements IGenericUsersRepository<Preceptor> {
  private ormRepository: Repository<Preceptor>;

  constructor() {
    this.ormRepository = getRepository(Preceptor);
  }

  public async createUserOfType(preceptor: Preceptor): Promise<void> {
    const createdPreceptor = await this.ormRepository.create(preceptor);

    await this.saveUserOfType(createdPreceptor);
  }

  public async saveUserOfType(preceptor: Preceptor): Promise<Preceptor> {
    return this.ormRepository.save(preceptor);
  }
}
