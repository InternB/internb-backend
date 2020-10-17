import { v4 } from 'uuid';

import ICreateCalendarDTO from '@modules/disciplines/dtos/ICreateCalendarDTO';
import Calendar from '@modules/disciplines/infra/typeorm/entities/Calendar';
import ICalendarsRepository from '../ICalendarsRepository';

export default class FakeCalendarsRepository implements ICalendarsRepository {
  calendars: Calendar[] = [];

  public async create(data: ICreateCalendarDTO): Promise<Calendar> {
    const calendar = new Calendar();
    Object.assign(calendar, {
      id: v4(),
      ...data,
    });

    this.calendars.push(calendar);

    return calendar;
  }

  public async save(calendar: Calendar): Promise<Calendar> {
    const idx = this.calendars.findIndex(x => x.id === calendar.id);

    this.calendars[idx] = calendar;

    return calendar;
  }
}
