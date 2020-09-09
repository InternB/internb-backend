import { v4 } from 'uuid';

import Internship from '@modules/disciplines/infra/typeorm/entities/Internship';
import ICreateInternshipDTO from '@modules/disciplines/dtos/ICreateInternshipDTO';
import { Exception } from 'handlebars';
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

  public async findById(id: string): Promise<Internship | undefined> {
    const internship = this.internships.find(x => x.id === id);

    return internship;
  }

  public async findByStudentAndClassIds(
    student_id: string,
    class_id: string,
  ): Promise<Internship | undefined> {
    const internship = this.internships.find(
      x => x.student_id === student_id && x.class_id === class_id,
    );

    return internship;
  }

  public async findAllStudentInternships(
    student_id: string,
  ): Promise<Internship[]> {
    const internships = this.internships.filter(
      x => x.student_id === student_id,
    );

    return internships;
  }

  public async findAllInternsOfProfessor(
    professor_id: string,
  ): Promise<Internship[]> {
    const interns = this.internships.filter(
      x => x.class_professor_id === professor_id,
    );

    return interns;
  }
}
