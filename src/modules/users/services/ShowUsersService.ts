import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ShowUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('Must be registered to request Users list');

    if (user.role !== 0)
      throw new AppError('Must be an Admin to request Users list', 403);

    const users = await this.usersRepository.getAllUsers(user_id);

    return users;
  }
}

export default ShowUsersService;
