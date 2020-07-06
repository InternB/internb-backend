import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  admin_id: string;
  user_id: string;
}

@injectable()
class AdminDeletesUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ admin_id, user_id }: IRequest): Promise<void> {
    const admin = await this.usersRepository.findById(admin_id);

    if (!admin) throw new AppError('Admin does not exist');

    if (admin.role !== 0)
      throw new AppError(
        "You must be an Admin to delete another user's account",
        403,
      );

    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('User does not exist');

    if (!user.active) throw new AppError("Can't delete an inactive User");

    await this.usersRepository.deleteUser(user);

    return;
  }
}

export default AdminDeletesUserService;
