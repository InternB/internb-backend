import Discipline from '@modules/disciplines/infra/typeorm/entities/Discipline';

import IDisciplinesRepository from '../IDisciplinesRepository';
import ICreateDisciplineDTO from '../../dtos/ICreateDisciplineDTO';

export default class FakeDisciplinesRepository
  implements IDisciplinesRepository {
  private disciplines: Discipline[] = [];

  public async create(discipline: ICreateDisciplineDTO): Promise<Discipline> {
    const newDiscipline = new Discipline();
    Object.assign(newDiscipline, {
      id: discipline.id,
      name: discipline.name,
      created_at: Date.now(),
      updated_at: Date.now(),
    });

    this.disciplines.push(newDiscipline);

    return newDiscipline;
  }

  public async getAll(): Promise<Discipline[]> {
    return this.disciplines;
  }

  public async findById(id: string): Promise<Discipline | undefined> {
    const discipline = this.disciplines.find(x => x.id === id);

    return discipline;
  }

  public async findByName(name: string): Promise<Discipline | undefined> {
    const discipline = this.disciplines.find(x => x.name === name);

    return discipline;
  }
}
