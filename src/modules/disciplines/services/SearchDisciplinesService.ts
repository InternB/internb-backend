import { inject, injectable } from 'tsyringe';
import Discipline from '../infra/typeorm/entities/Discipline';
import IDisciplinesRepository from '../repositories/IDisciplinesRepository';

@injectable()
class SearchDisciplinesService {
  constructor(
    @inject('DisciplinesRepository')
    private disciplinesRepository: IDisciplinesRepository,
  ) {}

  public async execute(term: string): Promise<Discipline[]> {
    const disciplines = await this.disciplinesRepository.findByTerm(term);
    return disciplines;
  }
}

export default SearchDisciplinesService;
