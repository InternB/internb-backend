import { inject, injectable } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/model/IStorageProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import Class from '../infra/typeorm/entities/Class';
import IClassesRepository from '../repositories/IClassesRepository';
import IDisciplinesRepository from '../repositories/IDisciplinesRepository';

interface IRequest {
  id: string;
  semester: string;
  total_students_enrolled: number;
  discipline_id: string;
  professor_id: string;
  pdf_guide: string;
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

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    id,
    semester,
    total_students_enrolled,
    discipline_id,
    professor_id,
    pdf_guide,
  }: IRequest): Promise<Class> {
    const disciplineById = await this.disciplinesRepository.findById(
      discipline_id,
    );
    if (!disciplineById) throw new AppError('Disciplina não cadastrada', 404);

    const professorById = await this.usersRepository.findById(professor_id);
    if (!professorById) throw new AppError('Professor não cadastrado', 404);

    const classExists = await this.classesRepository.findById(id);
    if (classExists) throw new AppError('Turma já cadastrada', 400);

    const file = await this.storageProvider.saveFile('.pdf', pdf_guide);

    const newClass = await this.classesRepository.create({
      id,
      semester,
      total_students_enrolled,
      discipline_id,
      professor_id,
      pdf_guide: file,
    });

    return newClass;
  }
}

export default CreateClassService;
