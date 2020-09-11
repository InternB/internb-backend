import { getRepository, Repository } from 'typeorm';

import IGenericUsersRepository from '@modules/users/repositories/IGenericUsersRepository';

import Preceptor from '../entities/Preceptor';

export default class PreceptorsRepository
  implements IGenericUsersRepository<Preceptor> {
  private ormRepository: Repository<Preceptor>;

  constructor() {
    this.ormRepository = getRepository(Preceptor);
  }

  public async createUserOfType(preceptor: Preceptor): Promise<Preceptor> {
    const createdPreceptor = await this.ormRepository.create(preceptor);

    await this.saveUserOfType(createdPreceptor);

    return createdPreceptor;
  }

  public async saveUserOfType(preceptor: Preceptor): Promise<Preceptor> {
    return this.ormRepository.save(preceptor);
  }

  public async findById(id: string): Promise<Preceptor | undefined> {
    const preceptor = await this.ormRepository.findOne({ where: { id } });

    return preceptor;
  }

  public async findUserOfTypeById(id: string): Promise<Preceptor | undefined> {
    const preceptor = await this.ormRepository.findOne({
      where: { user_id: id },
    });

    return preceptor;
  }
}
