import { v4 } from 'uuid';

import Internship from '@modules/disciplines/infra/typeorm/entities/Internship';
import ICreateInternshipDTO from '@modules/disciplines/dtos/ICreateInternshipDTO';
import IInternshipsRepository from '../IInternshipsRepository';

export default class FakeInternshipsRepository
  implements IInternshipsRepository {
  private internships: Internship[] = [];

  public async create(data: ICreateInternshipDTO): Promise<Internship> {
    const internship = new Internship();
    Object.assign(internship, {
      id: v4(),
      ...data,
      created_at: Date.now(),
      updated_at: Date.now(),
    });

    this.internships.push(internship);

    return internship;
  }

  public async save(internship: Internship): Promise<Internship> {
    const idx = this.internships.findIndex(x => x.id === internship.id);

    this.internships[idx] = internship;

    return internship;
  }
}
