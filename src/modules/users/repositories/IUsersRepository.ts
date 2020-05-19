import User from '../infra/typeorm/entities/User';

import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersInterface {
  create(data: ICreateUserDTO): Promise<User>;
  // findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findByCPF(cpf: string): Promise<User | undefined>;
}
