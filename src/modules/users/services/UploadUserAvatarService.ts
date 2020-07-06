import path from 'path';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStorageProvider from '@shared/container/providers/StorageProvider/model/IStorageProvider';

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

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ id, avatar }: IRequest): Promise<User> {
    let user = await this.usersRepository.findById(id);

    if (!user) throw new AppError('User does not exist');

    if (!user.active)
      throw new AppError('User must be active to upload a new avatar');

    await this.storageProvider.saveFile(path.extname(avatar), avatar);

    user.avatar = avatar;
    user.updated_at = new Date();

    user = await this.usersRepository.save(user);

    return user;
  }
}

export default UploadUserAvatarService;
