import { v4 } from 'uuid';

import Professor from '@modules/users/infra/typeorm/entities/Professor';

import IGenericUsersRepository from '../IGenericUsersRepository';

export default class FakeProfessorsRepository
  implements IGenericUsersRepository<Professor> {
  private professors: Professor[] = [];

  public async createUserOfType(professor: Professor): Promise<void> {
    professor.id = v4();
    professor.user.id = v4();
    this.professors.push(professor);
  }

  public async saveUserOfType(professor: Professor): Promise<Professor> {
    const idx = this.professors.findIndex(x => x.user.id === professor.user.id);
    this.professors[idx] = professor;

    return professor;
  }
}
