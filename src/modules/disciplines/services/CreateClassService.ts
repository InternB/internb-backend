import { inject, injectable } from 'tsyringe';

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';
import IGenericUsersRepository from '@modules/users/repositories/IGenericUsersRepository';
import Professor from '@modules/users/infra/typeorm/entities/Professor';
import Class from '../infra/typeorm/entities/Class';
import IClassesRepository from '../repositories/IClassesRepository';
import IDisciplinesRepository from '../repositories/IDisciplinesRepository';

interface IRequest {
  sign: string;
  semester: string;
  password: string;
  total_students_enrolled: number;
  discipline_id: string;
  user_id: string;
}

@injectable()
class CreateClassService {
  constructor(
    @inject('ClassesRepository')
    private classesRepository: IClassesRepository,

    @inject('DisciplinesRepository')
    private disciplinesRepository: IDisciplinesRepository,

    @inject('ProfessorsRepository')
    private professorsRepository: IGenericUsersRepository<Professor>,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    sign,
    semester,
    password,
    total_students_enrolled,
    discipline_id,
    user_id,
  }: IRequest): Promise<Class> {
    const disciplineById = await this.disciplinesRepository.findById(
      discipline_id,
    );
    if (!disciplineById) throw new AppError('Disciplina não cadastrada', 404);

    const professorById = await this.professorsRepository.findUserOfTypeById(
      user_id,
    );
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
      professor_id: professorById.id,
    });

    return newClass;
  }
}

export default CreateClassService;
