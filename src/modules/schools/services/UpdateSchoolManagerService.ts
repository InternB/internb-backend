import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ISchoolManagersRepository from '../repositories/ISchoolManagersRepository';
import SchoolManager from '../infra/typeorm/entities/SchoolManager';

interface IRequest {
  id: string;
  role: number;
  fullname: string;
  phone?: string;
  email?: string;
}

@injectable()
class UpdateSchoolManagerService {
  constructor(
    @inject('SchoolManagersRepository')
    private schoolManagersRepository: ISchoolManagersRepository,
  ) {}

  public async execute({
    id,
    role,
    fullname,
    phone,
    email,
  }: IRequest): Promise<SchoolManager> {
    const schoolManager = await this.schoolManagersRepository.findById(id);

    if (!schoolManager)
      throw new AppError('School Manager does not exist', 404);

    Object.assign(schoolManager, {
      id,
      role,
      fullname,
      phone,
      email,
    });

    const updatedSchoolManager = await this.schoolManagersRepository.save(
      schoolManager,
    );

    return updatedSchoolManager;
  }
}

export default UpdateSchoolManagerService;
