import { uuid } from 'uuidv4';

import User from '../../infra/typeorm/entities/User';

import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import IUsersRepository from '../IUsersRepository';

export default class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create({
    cpf,
    email,
    password,
    fullname,
    phone,
    role,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: uuid(),
      cpf,
      email,
      password,
      fullname,
      phone,
      role,
    });

    this.users.push(user);

    return user;
  }

  public async findByCPF(cpf: string): Promise<User | undefined> {
    const findCPF = this.users.find(user => user.cpf === cpf);

    return findCPF;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findEmail = this.users.find(user => user.email === email);

    return findEmail;
  }
}
