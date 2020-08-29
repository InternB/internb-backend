import { Repository, getRepository } from 'typeorm';

import IInternshipsRepository from '@modules/disciplines/repositories/IInternshipsRepository';
import ICreateInternshipDTO from '@modules/disciplines/dtos/ICreateInternshipDTO';
import Internship from '../entities/Internship';

export default class InternshipsRepository implements IInternshipsRepository {
  private ormRepository: Repository<Internship>;

  constructor() {
    this.ormRepository = getRepository(Internship);
  }

  public async create(data: ICreateInternshipDTO): Promise<Internship> {
    let internship = new Internship();
    Object.assign(internship, data);

    internship = this.ormRepository.create(internship);
    internship = await this.save(internship);

    return internship;
  }

  public async save(internship: Internship): Promise<Internship> {
    return this.ormRepository.save(internship);
  }
}
