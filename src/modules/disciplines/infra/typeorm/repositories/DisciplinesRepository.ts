import { getRepository, Repository, Like } from 'typeorm';

import ICreateDisciplineDTO from '@modules/disciplines/dtos/ICreateDisciplineDTO';

import Discipline from '../entities/Discipline';
import IDisciplinesRepository from '../../../repositories/IDisciplinesRepository';

export default class DisciplinesRepository implements IDisciplinesRepository {
  private ormRepository: Repository<Discipline>;

  constructor() {
    this.ormRepository = getRepository(Discipline);
  }

  public async create({ id, name }: ICreateDisciplineDTO): Promise<Discipline> {
    let discipline = new Discipline();
    Object.assign(discipline, {
      id: id.toLowerCase(),
      name: name.toLowerCase(),
    });

    this.ormRepository.create(discipline);

    discipline = await this.save(discipline);

    return discipline;
  }

  public async getAll(): Promise<Discipline[]> {
    const disciplines = await this.ormRepository.find();

    return disciplines;
  }

  public async findById(id: string): Promise<Discipline | undefined> {
    const discipline = await this.ormRepository.findOne({ where: { id } });

    return discipline;
  }

  public async findByName(name: string): Promise<Discipline | undefined> {
    const discipline = await this.ormRepository.findOne({ where: { name } });

    return discipline;
  }

  public async findByTerm(term: string): Promise<Discipline[]> {
    const disciplines = await this.ormRepository.find({
      where: [
        { id: Like(`%${term.toLowerCase()}%`) },
        { name: Like(`%${term.toLowerCase()}%`) },
      ],
    });

    return disciplines;
  }

  private async save(discipline: Discipline): Promise<Discipline> {
    const savedDiscipline = await this.ormRepository.save(discipline);

    return savedDiscipline;
  }
}
