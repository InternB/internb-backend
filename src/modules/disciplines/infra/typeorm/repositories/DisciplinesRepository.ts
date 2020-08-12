import { getRepository, Repository } from 'typeorm';

import Discipline from '../entities/Discipline';
import IDisciplinesRepository from '../../../repositories/IDisciplinesRepository';

export default class DisciplinesRepository implements IDisciplinesRepository {
  private ormRepository: Repository<Discipline>;

  constructor() {
    this.ormRepository = getRepository(Discipline);
  }

  public async getAll(): Promise<Discipline[]> {
    const disciplines = await this.ormRepository.find();

    return disciplines;
  }
}
