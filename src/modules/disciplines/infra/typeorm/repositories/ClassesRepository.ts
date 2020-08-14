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
    id,
    semester,
    total_students_enrolled,
    discipline_id,
    professor_id,
    pdf_guide,
  }: ICreateClassDTO): Promise<Class> {
    let newClass = new Class();
    Object.assign(newClass, {
      id,
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

  public async findById(id: string): Promise<Class | undefined> {
    const foundClass = await this.ormRepository.findOne({
      where: { id },
    });

    return foundClass;
  }

  private async save(savingClass: Class): Promise<Class> {
    return this.ormRepository.save(savingClass);
  }
}
