import ICreateClassDTO from '@modules/disciplines/dtos/ICreateClassDTO';
import Class from '@modules/disciplines/infra/typeorm/entities/Class';

import IClassesRepository from '../IClassesRepository';

export default class FakeClassesRepository implements IClassesRepository {
  private classes: Class[] = [];

  public async create({
    id,
    semester,
    password,
    total_students_enrolled,
    discipline_id,
    professor_id,
  }: ICreateClassDTO): Promise<Class> {
    const newClass = new Class();
    Object.assign(newClass, {
      id,
      semester,
      password,
      total_students_enrolled,
      total_students_registered: 0,
      discipline_id,
      professor_id,
    });

    this.classes.push(newClass);

    return newClass;
  }

  public async getAll(): Promise<Class[]> {
    return this.classes;
  }

  public async findById(id: string): Promise<Class | undefined> {
    const foundClass = this.classes.find(x => x.id === id);

    return foundClass;
  }

  public async findByDiscipline(discipline_id: string): Promise<Class[]> {
    const classes = this.classes.filter(x => x.discipline_id === discipline_id);

    return classes;
  }

  public async findByProfessor(professor_id: string): Promise<Class[]> {
    const classes = this.classes.filter(x => x.professor_id === professor_id);

    return classes;
  }

  public async findByDisciplineProfessor(
    discipline_id: string,
    professor_id: string,
  ): Promise<Class[]> {
    const classes = this.classes.filter(
      x => x.discipline_id === discipline_id && x.professor_id === professor_id,
    );

    return classes;
  }
}
