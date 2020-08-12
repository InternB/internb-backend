import Discipline from '@modules/disciplines/infra/typeorm/entities/Discipline';

import IDisciplinesRepository from '../IDisciplinesRepository';

export default class FakeDisciplinesRepository
  implements IDisciplinesRepository {
  private disciplines: Discipline[] = [];

  constructor() {
    const estagio1 = new Discipline();
    Object.assign(estagio1, {
      id: 'CIC0124',
      name: 'Estágio 1',
      created_at: Date.now(),
      updated_at: Date.now(),
    });

    const estagio2 = new Discipline();
    Object.assign(estagio2, {
      id: 'CIC473',
      name: 'Estágio 2',
      created_at: Date.now(),
      updated_at: Date.now(),
    });

    this.disciplines.push(estagio1, estagio2);
  }

  public async getAll(): Promise<Discipline[]> {
    return this.disciplines;
  }
}
