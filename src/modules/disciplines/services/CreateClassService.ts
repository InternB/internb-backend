import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';
import Class from '../infra/typeorm/entities/Class';
import IClassesRepository from '../repositories/IClassesRepository';
import IDisciplinesRepository from '../repositories/IDisciplinesRepository';

interface IRequest {
  sign: string;
  semester: string;
  password: string;
  total_students_enrolled: number;
  discipline_id: string;
  professor_id: string;
}

@injectable()
class CreateClassService {
  constructor(
    @inject('ClassesRepository')
    private classesRepository: IClassesRepository,

    @inject('DisciplinesRepository')
    private disciplinesRepository: IDisciplinesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    sign,
    semester,
    password,
    total_students_enrolled,
    discipline_id,
    professor_id,
  }: IRequest): Promise<Class> {
    const disciplineById = await this.disciplinesRepository.findById(
      discipline_id,
    );
    if (!disciplineById) throw new AppError('Disciplina não cadastrada', 404);

    const professorById = await this.usersRepository.findById(professor_id);
    if (!professorById) throw new AppError('Professor não cadastrado', 404);

    const classExists = await this.classesRepository.findBySignAndDisciplineId(
      sign,
      discipline_id,
    );
    if (classExists) throw new AppError('Turma já cadastrada', 400);

    const hashedPassword = await this.hashProvider.generate(password);

    const newClass = await this.classesRepository.create({
      sign,
      semester,
      password: hashedPassword,
      total_students_enrolled,
      discipline_id,
      professor_id,
    });

    return newClass;
  }
}

export default CreateClassService;
