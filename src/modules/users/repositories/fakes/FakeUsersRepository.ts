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
    active,
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
      active,
    });

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const idx = this.users.findIndex(savedUser => savedUser.id === user.id);

    this.users[idx] = user;

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findId = this.users.find(user => user.id === id);

    return findId;
  }

  public async findByCPF(cpf: string): Promise<User | undefined> {
    const findCPF = this.users.find(user => user.cpf === cpf);

    return findCPF;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findEmail = this.users.find(user => user.email === email);

    return findEmail;
  }

  public async getAllUsers(user_id: string): Promise<User[]> {
    const users: User[] = [];

    this.users.forEach(user => {
      if (user.id !== user_id) users.push(user);
    });

    return users;
  }

  public async userExists(id: string): Promise<boolean> {
    const any = this.users.findIndex(user => user.id === id);

    return any !== -1;
  }

  public async deleteUser(user: User): Promise<void> {
    const idx = this.users.findIndex(savedUser => savedUser.id === user.id);
    this.users[idx].deleted_at = new Date();
  }
}
