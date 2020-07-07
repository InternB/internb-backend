import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ISchoolsRepository from '../repositories/ISchoolsRepository';
import School from '../infra/typeorm/entities/School';

interface IRequest {
  id: string;
}

@injectable()
class ShowSchoolService {
  constructor(
    @inject('SchoolsRepository')
    private schoolsRepository: ISchoolsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<School> {
    const school = await this.schoolsRepository.findById(id);

    if (!school) throw new AppError('School does not exist', 404);

    return school;
  }
}

export default ShowSchoolService;
