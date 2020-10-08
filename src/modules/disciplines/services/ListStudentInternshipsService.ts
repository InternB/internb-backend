import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IGenericUsersRepository from '@modules/users/repositories/IGenericUsersRepository';
import Student from '@modules/users/infra/typeorm/entities/Student';
import IInternshipsRepository from '../repositories/IInternshipsRepository';
import Internship from '../infra/typeorm/entities/Internship';

interface IRequest {
  user_id: string;
}

@injectable()
class ListStudentInternshipsService {
  constructor(
    @inject('StudentsRepository')
    private studentsRepository: IGenericUsersRepository<Student>,

    @inject('InternshipsRepository')
    private internshipsRepository: IInternshipsRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Internship[]> {
    const student = await this.studentsRepository.findUserOfTypeById(user_id);
    if (!student) throw new AppError('Student not found', 404);

    const internships = await this.internshipsRepository.findAllStudentInternships(
      student.id,
    );

    return internships;
  }
}

export default ListStudentInternshipsService;
