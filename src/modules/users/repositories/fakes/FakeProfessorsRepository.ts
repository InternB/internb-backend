import { v4 } from 'uuid';

import Professor from '@modules/users/infra/typeorm/entities/Professor';

import IGenericUsersRepository from '../IGenericUsersRepository';

export default class FakeProfessorsRepository
  implements IGenericUsersRepository<Professor> {
  private professors: Professor[] = [];

  public async createUserOfType(professor: Professor): Promise<Professor> {
    professor.id = v4();
    professor.user.id = v4();
    this.professors.push(professor);
    return professor;
  }

  public async saveUserOfType(professor: Professor): Promise<Professor> {
    const idx = this.professors.findIndex(x => x.user.id === professor.user.id);
    this.professors[idx] = professor;

    return professor;
  }

  public async findUserOfTypeById(id: string): Promise<Professor | undefined> {
    const professor = this.professors.find(x => x.id === id);

    return professor;
  }
}
