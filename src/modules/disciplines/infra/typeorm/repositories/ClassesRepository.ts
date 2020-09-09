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
    sign,
    semester,
    password,
    total_students_enrolled,
    discipline_id,
    professor_id,
  }: ICreateClassDTO): Promise<Class> {
    let newClass = new Class();
    Object.assign(newClass, {
      sign,
      semester,
      password,
      total_students_enrolled,
      discipline_id,
      professor_id,
    });

    this.ormRepository.create(newClass);

    newClass = await this.save(newClass);

    return newClass;
  }

  public async getAll(): Promise<Class[]> {
    const classes = await this.ormRepository.find();

    return classes;
  }

  public async findById(id: string): Promise<Class | undefined> {
    const foundClass = await this.ormRepository.findOne({ where: { id } });

    return foundClass;
  }

  public async findBySignAndDisciplineId(
    sign: string,
    discipline_id: string,
  ): Promise<Class | undefined> {
    const classFound = await this.ormRepository.findOne({
      where: { sign, discipline_id },
    });

    return classFound;
  }

  public async findByDiscipline(discipline_id: string): Promise<Class[]> {
    const classes = await this.ormRepository.find({ where: { discipline_id } });

    return classes;
  }

  public async findByProfessor(professor_id: string): Promise<Class[]> {
    const classes = await this.ormRepository.find({ where: { professor_id } });

    return classes;
  }

  public async findByDisciplineProfessor(
    discipline_id: string,
    professor_id: string,
  ): Promise<Class[]> {
    const classes = await this.ormRepository.find({
      where: { discipline_id, professor_id },
    });

    return classes;
  }

  public async save(savingClass: Class): Promise<Class> {
    return this.ormRepository.save(savingClass);
  }
}
