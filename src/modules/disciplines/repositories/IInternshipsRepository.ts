import Internship from '../infra/typeorm/entities/Internship';
import ICreateInternshipDTO from '../dtos/ICreateInternshipDTO';

export default interface IInternshipsRepository {
  create(data: ICreateInternshipDTO): Promise<Internship>;
  save(internship: Internship): Promise<Internship>;
}
