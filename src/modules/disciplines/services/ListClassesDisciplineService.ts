import { inject, injectable } from 'tsyringe';

import Class from '../infra/typeorm/entities/Class';
import IClassesRepository from '../repositories/IClassesRepository';

interface IRequest {
  discipline_id: string | undefined;
  professor_id: string | undefined;
}

@injectable()
class ListClassesDisciplineService {
  constructor(
    @inject('ClassesRepository')
    private classesRepository: IClassesRepository,
  ) {}

  public async execute({
    discipline_id,
    professor_id,
  }: IRequest): Promise<Class[]> {
    let classes: Class[] = [];

    if (!discipline_id && !professor_id)
      classes = await this.classesRepository.getAll();

    if (discipline_id && !professor_id)
      classes = await this.classesRepository.findByDiscipline(discipline_id);

    if (!discipline_id && professor_id)
      classes = await this.classesRepository.findByProfessor(professor_id);

    if (discipline_id && professor_id)
      classes = await this.classesRepository.findByDisciplineProfessor(
        discipline_id,
        professor_id,
      );

    return classes;
  }
}

export default ListClassesDisciplineService;
