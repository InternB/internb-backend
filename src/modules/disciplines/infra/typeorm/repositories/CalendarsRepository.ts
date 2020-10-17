import { getRepository, Repository } from 'typeorm';

import ICreateCalendarDTO from '../../../dtos/ICreateCalendarDTO';
import ICalendarsRepository from '../../../repositories/ICalendarsRepository';
import Calendar from '../entities/Calendar';

export default class CalendarsRepository implements ICalendarsRepository {
  private ormRepository: Repository<Calendar>;

  constructor() {
    this.ormRepository = getRepository(Calendar);
  }

  public async create(data: ICreateCalendarDTO): Promise<Calendar> {
    let calendar = new Calendar();
    Object.assign(calendar, data);

    calendar = this.ormRepository.create(calendar);
    await this.save(calendar);

    return calendar;
  }

  public async save(calendar: Calendar): Promise<Calendar> {
    return this.ormRepository.save(calendar);
  }
}
