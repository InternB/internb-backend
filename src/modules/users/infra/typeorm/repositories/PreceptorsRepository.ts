import { getRepository, Repository } from 'typeorm';

import IGenericUsersRepository from '@modules/users/repositories/IGenericUsersRepository';

import IPreceptorsRepository from '@modules/users/repositories/IPreceptorsRepository';
import Preceptor from '../entities/Preceptor';

export default class PreceptorsRepository
  implements IGenericUsersRepository<Preceptor>, IPreceptorsRepository {
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

  public async findById(
    id: string,
    eager = false,
  ): Promise<Preceptor | undefined> {
    const preceptor = await this.ormRepository.findOne({
      where: { id },
      loadEagerRelations: eager,
    });

    return preceptor;
  }

  public async findBySchoolId(school_id: string): Promise<Preceptor[]> {
    const preceptors = await this.ormRepository.find({
      where: { school_id },
      loadEagerRelations: true,
    });

    return preceptors;
  }

  public async findUserOfTypeById(id: string): Promise<Preceptor | undefined> {
    const preceptor = await this.ormRepository.findOne({
      where: { user_id: id },
    });

    return preceptor;
  }
}
