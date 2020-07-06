import path from 'path';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStorageProvider from '@shared/container/providers/StorageProvider/model/IStorageProvider';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  student_id: string;
  commitmentTerm: string;
  contract: {
    firstCopy: string;
    secondCopy: string;
    thirdCopy: string;
  };
}

@injectable()
class UploadStudentContractFilesService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    student_id,
    commitmentTerm,
    contract: { firstCopy, secondCopy, thirdCopy },
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(student_id);

    if (!user || user.role !== 3 || !user.active) {
      this.storageProvider.deleteTmpFiles([
        commitmentTerm,
        firstCopy,
        secondCopy,
        thirdCopy,
      ]);
    }

    if (!user) throw new AppError('Student does not exist');

    if (user.role !== 3) throw new AppError('User is not a student');

    if (!user.active)
      throw new AppError("Can't upload files for an inactive user");

    const commitmentFile = await this.storageProvider.saveFile(
      path.extname(commitmentTerm),
      commitmentTerm,
    );

    const contractFiles = await this.storageProvider.saveFiles('.pdf', [
      firstCopy,
      secondCopy,
      thirdCopy,
    ]);

    user.updated_at = new Date();

    const updatedUser = this.usersRepository.save({
      ...user,
      contract_files: `${commitmentFile};${contractFiles[0]};${contractFiles[1]};${contractFiles[2]}`,
    } as User);

    return updatedUser;
  }
}

export default UploadStudentContractFilesService;
