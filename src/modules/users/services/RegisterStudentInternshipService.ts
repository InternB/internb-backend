import { inject, injectable } from 'tsyringe';

import Internship from '@modules/disciplines/infra/typeorm/entities/Internship';
import IClassesRepository from '@modules/disciplines/repositories/IClassesRepository';
import IInternshipsRepository from '@modules/disciplines/repositories/IInternshipsRepository';
import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IGenericUsersRepository from '../repositories/IGenericUsersRepository';
import Student from '../infra/typeorm/entities/Student';

interface IRequest {
  user_id: string;
  class_id: string;
  password: string;
}

@injectable()
class RegisterStudentInternshipService {
  constructor(
    @inject('StudentsRepository')
    private studentsRepository: IGenericUsersRepository<Student>,

    @inject('ClassesRepository')
    private classesRepository: IClassesRepository,

    @inject('InternshipsRepository')
    private internshipsRepository: IInternshipsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    class_id,
    password,
  }: IRequest): Promise<Internship> {
    const student = await this.studentsRepository.findUserOfTypeById(user_id);
    if (!student) throw new AppError('Student not found', 404);

    let classById = await this.classesRepository.findById(class_id);
    if (!classById) throw new AppError('Class does not exist', 404);

    const registeredStudent = await this.internshipsRepository.findByStudentAndClassIds(
      student.id,
      class_id,
    );
    if (registeredStudent)
      throw new AppError('Student already registered in this class', 400);

    const correctPassword = await this.hashProvider.compareHash(
      password,
      classById.password,
    );
    if (!correctPassword) throw new AppError('Incorrect password', 403);

    if (
      classById.total_students_registered === classById.total_students_enrolled
    )
      throw new AppError('Class is already full', 400);

    classById.total_students_registered += 1;
    classById = await this.classesRepository.save(classById);

    const internship = await this.internshipsRepository.create({
      student_id: student.id,
      class_id,
      class_discipline_id: classById.discipline_id,
      class_professor_id: classById.professor_id,
    });

    return internship;
  }
}

export default RegisterStudentInternshipService;
