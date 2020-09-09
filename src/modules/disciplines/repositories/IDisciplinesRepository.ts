import Discipline from '../infra/typeorm/entities/Discipline';
import ICreateDisciplineDTO from '../dtos/ICreateDisciplineDTO';

export default interface IDisciplinesRepository {
  create(discipline: ICreateDisciplineDTO): Promise<Discipline>;
  getAll(): Promise<Discipline[]>;
  findById(id: string): Promise<Discipline | undefined>;
  findByName(name: string): Promise<Discipline | undefined>;
}
