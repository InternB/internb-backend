import { v4 } from 'uuid';

import Preceptor from '@modules/users/infra/typeorm/entities/Preceptor';

import IGenericUsersRepository from '../IGenericUsersRepository';

export default class FakePreceptorsRepository
  implements IGenericUsersRepository<Preceptor> {
  private preceptors: Preceptor[] = [];

  public async createUserOfType(
    data: Omit<Preceptor, 'id'>,
  ): Promise<Preceptor> {
    const preceptor = new Preceptor();
    Object.assign(preceptor, {
      id: preceptor.id = v4(),
      ...data,
    });
    this.preceptors.push(preceptor);
    return preceptor;
  }

  public async saveUserOfType(preceptor: Preceptor): Promise<Preceptor> {
    const idx = this.preceptors.findIndex(x => x.user.id === preceptor.user.id);
    this.preceptors[idx] = preceptor;

    return preceptor;
  }

  public async findUserOfTypeById(id: string): Promise<Preceptor | undefined> {
    const preceptor = this.preceptors.find(x => x.user_id === id);

    return preceptor;
  }
}
