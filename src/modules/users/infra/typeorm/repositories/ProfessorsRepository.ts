import { getRepository, Repository } from 'typeorm';

import IGenericUsersRepository from '@modules/users/repositories/IGenericUsersRepository';

import Professor from '../entities/Professor';

export default class ProfessorsRepository
  implements IGenericUsersRepository<Professor> {
  private ormRepository: Repository<Professor>;

  constructor() {
    this.ormRepository = getRepository(Professor);
  }

  public async createUserOfType(professor: Professor): Promise<void> {
    const createdProfessor = await this.ormRepository.create(professor);

    await this.saveUserOfType(createdProfessor);
  }

  public async saveUserOfType(professor: Professor): Promise<Professor> {
    return this.ormRepository.save(professor, {
      data: { user_id: professor.user.id },
    });
  }
}
