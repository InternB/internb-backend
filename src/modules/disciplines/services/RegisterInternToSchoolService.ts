import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Internship from '@modules/disciplines/infra/typeorm/entities/Internship';
import ISchoolsRepository from '@modules/schools/repositories/ISchoolsRepository';
import IInternshipsRepository from '@modules/disciplines/repositories/IInternshipsRepository';
import IGenericUsersRepository from '@modules/users/repositories/IGenericUsersRepository';
import Student from '@modules/users/infra/typeorm/entities/Student';

interface IRequest {
  internship_id: string;
  user_id: string;
  school_id: string;
}

@injectable()
class RegisterInternToSchoolService {
  constructor(
    @inject('StudentsRepository')
    private studentsRepository: IGenericUsersRepository<Student>,

    @inject('SchoolsRepository')
    private schoolsRepository: ISchoolsRepository,

    @inject('InternshipsRepository')
    private internshipsRepository: IInternshipsRepository,
  ) {}

  public async execute({
    internship_id,
    user_id,
    school_id,
  }: IRequest): Promise<Internship> {
    const student = await this.studentsRepository.findUserOfTypeById(user_id);
    if (!student) throw new AppError('Student not found', 404);

    let internship = await this.internshipsRepository.findById(internship_id);
    if (!internship) throw new AppError('Internship not found', 404);
    if (internship.school_id)
      throw new AppError('Internship already registered to a school', 400);

    const school = await this.schoolsRepository.findById(school_id);
    if (!school) throw new AppError('School not found', 404);

    internship.school = school;
    internship = await this.internshipsRepository.save(internship);
    internship.school_id = school.id;

    return internship;
  }
}

export default RegisterInternToSchoolService;
