import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import SchoolManager from '../infra/typeorm/entities/SchoolManager';

import ISchoolsRepository from '../repositories/ISchoolsRepository';
import ISchoolManagersRepository from '../repositories/ISchoolManagersRepository';

interface IRequest {
  admin_id: string;
  role: number;
  fullname: string;
  phone: string;
  email: string;
  school_id: string;
}

@injectable()
class CreateSchoolManagerService {
  constructor(
    @inject('SchoolManagersRepository')
    private schoolManagersRepository: ISchoolManagersRepository,

    @inject('SchoolsRepository')
    private schoolsRepository: ISchoolsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    admin_id,
    role,
    fullname,
    phone,
    email,
    school_id,
  }: IRequest): Promise<SchoolManager> {
    const user = await this.usersRepository.findById(admin_id);

    if (!user) throw new AppError('Admin does not exist', 400);

    const school = await this.schoolsRepository.findById(school_id);

    if (!school) throw new AppError('Escola não cadastrada');

    const school_manager = await this.schoolManagersRepository.create({
      role,
      fullname,
      email,
      phone,
      school_id,
    });

    return school_manager;
  }
}

export default CreateSchoolManagerService;
