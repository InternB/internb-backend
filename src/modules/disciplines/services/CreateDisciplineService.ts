import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Discipline from '../infra/typeorm/entities/Discipline';
import IDisciplinesRepository from '../repositories/IDisciplinesRepository';

interface IRequest {
  id: string;
  name: string;
}

@injectable()
class CreateDisciplineService {
  constructor(
    @inject('DisciplinesRepository')
    private disciplinesRepository: IDisciplinesRepository,
  ) {}

  public async execute({ id, name }: IRequest): Promise<Discipline> {
    const disciplineById = await this.disciplinesRepository.findById(id);

    if (disciplineById) throw new AppError('Disciplina já foi cadastrada', 400);

    const disciplineByName = await this.disciplinesRepository.findByName(name);

    if (disciplineByName)
      throw new AppError('Disciplina já foi cadastrada', 400);

    const discipline = await this.disciplinesRepository.create({ id, name });

    return discipline;
  }
}

export default CreateDisciplineService;
