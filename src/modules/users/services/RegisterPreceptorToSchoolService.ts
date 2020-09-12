import ISchoolsRepository from '@modules/schools/repositories/ISchoolsRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Preceptor from '../infra/typeorm/entities/Preceptor';
import IGenericUsersRepository from '../repositories/IGenericUsersRepository';

interface IRequest {
  user_id: string;
  school_id: string;
}

@injectable()
class RegisterPreceptorToSchool {
  constructor(
    @inject('PreceptorsRepository')
    private preceptorsRepository: IGenericUsersRepository<Preceptor>,

    @inject('SchoolsRepository')
    private schoolsRepository: ISchoolsRepository,
  ) {}

  public async execute({ user_id, school_id }: IRequest): Promise<Preceptor> {
    const preceptor = await this.preceptorsRepository.findUserOfTypeById(
      user_id,
    );
    if (!preceptor) throw new AppError('Preceptor not found', 404);

    const school = await this.schoolsRepository.findById(school_id);
    if (!school) throw new AppError('School not found', 404);

    preceptor.school = school;
    await this.preceptorsRepository.saveUserOfType(preceptor);
    preceptor.school_id = school.id;

    return preceptor;
  }
}

export default RegisterPreceptorToSchool;
