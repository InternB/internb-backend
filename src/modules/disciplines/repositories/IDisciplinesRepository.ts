import Discipline from '../infra/typeorm/entities/Discipline';

export default interface IDisciplinesRepository {
  getAll(): Promise<Discipline[]>;
}
