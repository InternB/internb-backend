import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  id: string;
}

@injectable()
class ActivateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) throw new AppError('User does not exist', 404);

    user.active = true;

    const activeUser = await this.usersRepository.save(user);

    return activeUser;
  }
}

export default ActivateUserService;
