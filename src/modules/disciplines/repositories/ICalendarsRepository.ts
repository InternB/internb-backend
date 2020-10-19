import ICreateCalendarDTO from '../dtos/ICreateCalendarDTO';
import Calendar from '../infra/typeorm/entities/Calendar';

export default interface ICalendarsRepository {
  create(data: ICreateCalendarDTO): Promise<Calendar>;
  save(calendar: Calendar): Promise<Calendar>;
}
