import Class from '../infra/typeorm/entities/Class';
import ICreateClassDTO from '../dtos/ICreateClassDTO';

export default interface IClassesRepository {
  create(data: ICreateClassDTO): Promise<Class>;
  getAll(eager?: boolean): Promise<Class[]>;
  findById(id: string): Promise<Class | undefined>;
  findBySignAndDisciplineId(
    sign: string,
    discipline_id: string,
  ): Promise<Class | undefined>;
  findByDiscipline(discipline_id: string, eager?: boolean): Promise<Class[]>;
  findByProfessor(professor_id: string, eager?: boolean): Promise<Class[]>;
  findByDisciplineProfessor(
    discipline_id: string,
    professor_id: string,
    eager?: boolean,
  ): Promise<Class[]>;
  save(classToSave: Class): Promise<Class>;
}
