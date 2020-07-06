import path from 'path';
import { inject, injectable } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/model/IStorageProvider';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  student_id: string;
  work_plan: string;
}

@injectable()
class UploadStudentWorkPlanService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ student_id, work_plan }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(student_id);

    if (!user || user.role !== 3 || !user.active)
      this.storageProvider.deleteTmpFiles([work_plan]);

    if (!user) throw new AppError('Student does not exist');

    if (user.role !== 3) throw new AppError('User is not a student');

    if (!user.active)
      throw new AppError("Can't upload files for an inactive user");

    await this.storageProvider.saveFile(path.extname(work_plan), work_plan);

    user.updated_at = new Date();

    const updatedUser = this.usersRepository.save({ ...user, work_plan });

    return updatedUser;
  }
}

export default UploadStudentWorkPlanService;
