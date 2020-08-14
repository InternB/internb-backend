import ICreateClassDTO from '@modules/disciplines/dtos/ICreateClassDTO';
import Class from '@modules/disciplines/infra/typeorm/entities/Class';

import IClassesRepository from '../IClassesRepository';

export default class FakeClassesRepository implements IClassesRepository {
  private classes: Class[] = [];

  public async create({
    id,
    semester,
    total_students_enrolled,
    discipline_id,
    professor_id,
    pdf_guide,
  }: ICreateClassDTO): Promise<Class> {
    const newClass = new Class();
    Object.assign(newClass, {
      id,
      semester,
      total_students_enrolled,
      total_students_registered: 0,
      discipline_id,
      professor_id,
      pdf_guide,
    });

    this.classes.push(newClass);

    return newClass;
  }

  public async findById(id: string): Promise<Class | undefined> {
    const foundClass = this.classes.find(x => x.id === id);

    return foundClass;
  }
}
