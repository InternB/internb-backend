import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  old_password?: string;
  new_password?: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    id,
    fullname,
    email,
    phone,
    old_password,
    new_password,
  }: IRequest): Promise<User> {
    const userByEmail = await this.usersRepository.findByEmail(email);

    if (userByEmail) throw new AppError('Email already used');

    const user = await this.usersRepository.findById(id);

    if (!user) throw new AppError('User does not exist');

    Object.assign(user, {
      fullname,
      email,
      phone,
    });

    if (old_password && new_password) {
      const verifyOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!verifyOldPassword) throw new AppError('Old password does not match');

      user.password = await this.hashProvider.generate(new_password);
    }

    user.updated_at = new Date();

    const updatedUser = await this.usersRepository.save(user);

    return updatedUser;
  }
}

export default UpdateUserService;
