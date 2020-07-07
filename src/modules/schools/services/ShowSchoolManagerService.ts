import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import SchoolManager from '../infra/typeorm/entities/SchoolManager';
import ISchoolManagersRepository from '../repositories/ISchoolManagersRepository';

interface IRequest {
  id: string;
}

@injectable()
class ShowSchoolManagerService {
  constructor(
    @inject('SchoolManagersRepository')
    private schoolManagersRepository: ISchoolManagersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<SchoolManager> {
    const schoolManager = await this.schoolManagersRepository.findById(id);

    if (!schoolManager)
      throw new AppError('School Manager does not exist', 404);

    return schoolManager;
  }
}

export default ShowSchoolManagerService;
