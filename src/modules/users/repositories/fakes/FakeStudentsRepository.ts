import { v4 } from 'uuid';

import Student from '@modules/users/infra/typeorm/entities/Student';

import IGenericUsersRepository from '../IGenericUsersRepository';

export default class FakeStudentsRepository
  implements IGenericUsersRepository<Student> {
  private students: Student[] = [];

  public async createUserOfType(student: Student): Promise<Student> {
    student.id = v4();
    student.user.id = v4();
    this.students.push(student);
    return student;
  }

  public async saveUserOfType(student: Student): Promise<Student> {
    const idx = this.students.findIndex(x => x.user.id === student.user.id);
    this.students[idx] = student;

    return student;
  }

  public async findUserOfTypeById(id: string): Promise<Student | undefined> {
    const student = this.students.find(x => x.user_id === id);

    return student;
  }
}
