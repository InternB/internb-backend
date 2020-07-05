import { getRepository, Repository } from 'typeorm';

import User from '../entities/User';

import ICreateUserDTO from '../../../dtos/ICreateUserDTO';
import IUsersRepository from '../../../repositories/IUsersRepository';

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({
    cpf,
    email,
    fullname,
    password,
    phone,
    role,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      cpf,
      email,
      fullname,
      password,
      phone,
      role,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const savedUser = await this.ormRepository.save(user);

    return savedUser;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findId = await this.ormRepository.findOne({ where: { id } });

    return findId;
  }

  public async findByCPF(cpf: string): Promise<User | undefined> {
    const findCPF = await this.ormRepository.findOne({ where: { cpf } });

    return findCPF;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findEmail = await this.ormRepository.findOne({ where: { email } });

    return findEmail;
  }

  public async userExists(id: string): Promise<boolean> {
    const any = await this.ormRepository.count({ where: { id } });

    return any === 1;
  }
}
