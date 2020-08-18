import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import Student from '../infra/typeorm/entities/Student';
import Professor from '../infra/typeorm/entities/Professor';
import Preceptor from '../infra/typeorm/entities/Preceptor';
import IUserInfoDTO from '../dtos/IUserInfoDTO';
import IUsersRepository from '../repositories/IUsersRepository';
import IGenericUsersRepository from '../repositories/IGenericUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import CheckCPFIsValid from '../utils/CheckCPFIsValid';

interface IRequest {
  cpf: string;
  email: string;
  fullname: string;
  phone: string;
  password: string;
  role: number;
}

interface ICreateUserFunction {
  [key: number]: (data: IUserInfoDTO) => Promise<User>;
}

@injectable()
export default class CreateUserService {
  private createUserFunctions: ICreateUserFunction;

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ProfessorsRepository')
    private professorsRepository: IGenericUsersRepository<Professor>,

    @inject('PreceptorsRepository')
    private preceptorsRepository: IGenericUsersRepository<Preceptor>,

    @inject('StudentsRepository')
    private studentsRepository: IGenericUsersRepository<Student>,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {
    this.createUserFunctions = {
      0: this.createUser.bind(this),
      1: this.createProfessor.bind(this),
      2: this.createPreceptor.bind(this),
      3: this.createStudent.bind(this),
    };
  }

  public async execute(data: IRequest): Promise<User> {
    const findCPF = await this.usersRepository.findByCPF(data.cpf);
    if (findCPF) throw new AppError('CPF já está sendo utilizado');

    const findEmail = await this.usersRepository.findByEmail(data.email);
    if (findEmail) throw new AppError('E-mail já está sendo utilizado');

    const checkCPFIsValid = new CheckCPFIsValid();
    const validCPF = checkCPFIsValid.execute(data.cpf);
    if (!validCPF) throw new AppError('CPF informado é inválido');

    const hashedPassword = await this.hashProvider.generate(data.password);
    data.password = hashedPassword;

    const active = data.role === 3;

    const user = await this.createUserFunctions[data.role]({ ...data, active });

    return user;
  }

  private async createUser(data: IUserInfoDTO): Promise<User> {
    let user = new User();
    Object.assign(user, data);

    user = await this.usersRepository.create(user);

    return user;
  }

  private async createProfessor(data: IUserInfoDTO): Promise<User> {
    const professor = new Professor();

    const user = await this.createUser(data);
    professor.user = user;
    professor.user_id = user.id;

    await this.professorsRepository.createUserOfType(professor);

    return user;
  }

  private async createPreceptor(data: IUserInfoDTO): Promise<User> {
    const preceptor = new Preceptor();

    const user = await this.createUser(data);
    preceptor.user = user;
    preceptor.user_id = user.id;

    await this.preceptorsRepository.createUserOfType(preceptor);

    return user;
  }

  private async createStudent(data: IUserInfoDTO): Promise<User> {
    const student = new Student();

    const user = await this.createUser(data);
    student.user = user;
    student.user_id = user.id;

    await this.studentsRepository.createUserOfType(student);

    return user;
  }
}
