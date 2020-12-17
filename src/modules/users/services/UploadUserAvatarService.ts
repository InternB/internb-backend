import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  id: string;
  avatar: string;
}

@injectable()
class UploadUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id, avatar }: IRequest): Promise<User> {
    let user = await this.usersRepository.findById(id);

    if (!user) throw new AppError('User does not exist');

    user.avatar = avatar;
    user.updated_at = new Date();

    user = await this.usersRepository.save(user);

    return user;
  }
}

export default UploadUserAvatarService;
