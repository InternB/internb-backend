import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

import CheckCPFIsValid from '../utils/CheckCPFIsValid';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  cpf: string;
  email: string;
  fullname: string;
  phone: string;
  password: string;
  role: number;
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    cpf,
    email,
    fullname,
    phone,
    password,
    role,
  }: IRequest): Promise<User> {
    const findCPF = await this.usersRepository.findByCPF(cpf);
    if (findCPF) throw new AppError('CPF já está sendo utilizado');

    const findEmail = await this.usersRepository.findByEmail(email);
    if (findEmail) throw new AppError('E-mail já está sendo utilizado');

    const checkCPFIsValid = new CheckCPFIsValid();
    const validCPF = checkCPFIsValid.execute(cpf);
    if (!validCPF) throw new AppError('CPF informado é inválido');

    const hashedPassword = await this.hashProvider.generate(password);

    const user = await this.usersRepository.create({
      cpf,
      email,
      password: hashedPassword,
      fullname,
      phone,
      role,
      active: role === 3,
    });

    return user;
  }
}
