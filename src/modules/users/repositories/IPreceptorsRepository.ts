import Preceptor from '../infra/typeorm/entities/Preceptor';

export default interface IPreceptorsRepository {
  findBySchoolId(school_id: string): Promise<Preceptor[]>;
}
