import { getRepository, Repository, Not } from 'typeorm';

import User from '../entities/User';

import IUsersRepository from '../../../repositories/IUsersRepository';

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(user: User): Promise<User> {
    let createdUser = this.ormRepository.create(user);

    createdUser = await this.ormRepository.save(user);

    return createdUser;
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

  public async getAllUsers(user_id: string): Promise<User[]> {
    const users = await this.ormRepository.find({
      where: { id: Not(user_id) },
    });

    return users;
  }

  public async userExists(id: string): Promise<boolean> {
    const any = await this.ormRepository.count({ where: { id } });

    return any === 1;
  }

  public async deleteUser(user: User): Promise<void> {
    user.deleted_at = new Date();
    await this.ormRepository.save(user);
  }
}
