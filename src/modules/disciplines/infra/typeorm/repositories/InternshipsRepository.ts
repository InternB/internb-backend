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

  public async findById(id: string): Promise<Internship | undefined> {
    const internship = await this.ormRepository.findOne({
      where: { id },
      loadEagerRelations: false,
    });

    return internship;
  }

  public async findByStudentAndClassIds(
    student_id: string,
    class_id: string,
  ): Promise<Internship | undefined> {
    const internship = await this.ormRepository.findOne({
      where: { student_id, class_id },
    });

    return internship;
  }

  public async findAllStudentInternships(
    student_id: string,
  ): Promise<Internship[]> {
    const internships = await this.ormRepository.find({
      where: { student_id },
      loadEagerRelations: false,
    });

    return internships;
  }

  public async findAllInternsOfProfessor(
    professor_id: string,
    relations = [],
    loadEagerRelations = false,
  ): Promise<Internship[]> {
    const internships = await this.ormRepository.find({
      where: { class_professor_id: professor_id },
      relations,
      loadEagerRelations,
    });

    return internships;
  }

  public async findAllInternsOfPreceptor(
    preceptor_id: string,
  ): Promise<Internship[]> {
    const internships = await this.ormRepository.find({
      where: { preceptor_id },
      loadEagerRelations: false,
    });

    return internships;
  }
}
