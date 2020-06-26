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
class UploadStudentContractFiles {
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

    if (!user || user.role !== 3) {
      this.storageProvider.deleteTmpFiles([
        commitmentTerm,
        firstCopy,
        secondCopy,
        thirdCopy,
      ]);

      if (!user) throw new AppError('Student does not exist');

      if (user.role !== 3) throw new AppError('User is not a student');
    }

    const commitmentFile = await this.storageProvider.saveFile(
      path.extname(commitmentTerm),
      commitmentTerm,
    );

    const contractFiles = await this.storageProvider.saveFiles('.pdf', [
      firstCopy,
      secondCopy,
      thirdCopy,
    ]);

    const updatedUser = this.usersRepository.save({
      ...user,
      contractFiles: `${commitmentFile};${contractFiles[0]};${contractFiles[1]};${contractFiles[2]}`,
    });

    return updatedUser;
  }
}

export default UploadStudentContractFiles;
