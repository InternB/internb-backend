import Class from '../infra/typeorm/entities/Class';
import ICreateClassDTO from '../dtos/ICreateClassDTO';

export default interface IClassesRepository {
  create(data: ICreateClassDTO): Promise<Class>;
  getAll(): Promise<Class[]>;
  findById(id: string): Promise<Class | undefined>;
  findByDiscipline(discipline_id: string): Promise<Class[]>;
  findByProfessor(professor_id: string): Promise<Class[]>;
  findByDisciplineProfessor(
    discipline_id: string,
    professor_id: string,
  ): Promise<Class[]>;
}
