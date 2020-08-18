import { getRepository, Repository } from 'typeorm';

import IGenericUsersRepository from '@modules/users/repositories/IGenericUsersRepository';

import Student from '../entities/Student';

export default class StudentsRepository
  implements IGenericUsersRepository<Student> {
  private ormRepository: Repository<Student>;

  constructor() {
    this.ormRepository = getRepository(Student);
  }

  public async createUserOfType(student: Student): Promise<void> {
    const createdStudent = await this.ormRepository.create(student);

    await this.saveUserOfType(createdStudent);
  }

  public async saveUserOfType(student: Student): Promise<Student> {
    return this.ormRepository.save(student);
  }
}
