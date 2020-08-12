import { inject, injectable } from 'tsyringe';

import Discipline from '@modules/disciplines/infra/typeorm/entities/Discipline';
import IDisciplinesRepository from '@modules/disciplines/repositories/IDisciplinesRepository';

@injectable()
class ListDisciplinesService {
  constructor(
    @inject('DisciplinesRepository')
    private disciplinesRepository: IDisciplinesRepository,
  ) {}

  public async execute(): Promise<Discipline[]> {
    const disciplines = await this.disciplinesRepository.getAll();

    return disciplines;
  }
}

export default ListDisciplinesService;
