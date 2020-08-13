import { getRepository, Repository } from 'typeorm';

import ICreateClassDTO from '@modules/disciplines/dtos/ICreateClassDTO';
import Class from '../entities/Class';
import IClassesRepository from '../../../repositories/IClassesRepository';

export default class ClassesRepository implements IClassesRepository {
  private ormRepository: Repository<Class>;

  constructor() {
    this.ormRepository = getRepository(Class);
  }

  public async create({
    class: name,
    semester,
    total_students_enrolled,
    discipline_id,
    professor_id,
    pdf_guide,
  }: ICreateClassDTO): Promise<Class> {
    let newClass = new Class();
    Object.assign(newClass, {
      class: name,
      semester,
      total_students_enrolled,
      discipline_id,
      professor_id,
      pdf_guide,
    });

    this.ormRepository.create(newClass);

    newClass = await this.save(newClass);

    return newClass;
  }

  public async findByClass(name: string): Promise<Class | undefined> {
    const foundClass = this.ormRepository.findOne({ where: { class: name } });

    return foundClass;
  }

  private async save(savingClass: Class): Promise<Class> {
    return this.ormRepository.save(savingClass);
  }
}
