import User from '../infra/typeorm/entities/User';

export default interface IUsersRepository {
  create(data: User): Promise<User>;
  save(user: User): Promise<User>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findByCPF(cpf: string): Promise<User | undefined>;
  getAllUsers(user_id: string): Promise<User[]>;
  userExists(id: string): Promise<boolean>;
  deleteUser(user: User): Promise<void>;
}
