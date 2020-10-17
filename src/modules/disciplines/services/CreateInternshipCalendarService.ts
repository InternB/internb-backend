import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { isBefore } from 'date-fns';

import Calendar from '../infra/typeorm/entities/Calendar';
import ICalendarsRepository from '../repositories/ICalendarsRepository';
import IInternshipsRepository from '../repositories/IInternshipsRepository';

interface IRequest {
  internship_id: string;
  calendar: {
    starts_at: Date[];
    finishes_at: Date[];
  };
}

@injectable()
class CreateInternshipCalendarService {
  constructor(
    @inject('InternshipsRepository')
    private internshipsRepository: IInternshipsRepository,

    @inject('CalendarsRepository')
    private calendarsRepository: ICalendarsRepository,
  ) {}

  public async execute({
    internship_id,
    calendar,
  }: IRequest): Promise<Calendar> {
    const internship = await this.internshipsRepository.findById(internship_id);
    if (!internship) throw new AppError('Internship not found', 404);
    if (!internship.school_id)
      throw new AppError('Intern not registered to a school yet', 400);
    if (!internship.preceptor_id)
      throw new AppError('Inter not registered to a preceptor yet', 400);

    for (let i = 0; i < 5; i += 1)
      if (isBefore(calendar.finishes_at[i], calendar.starts_at[i]))
        throw new AppError('All finish times must be after start times', 400);

    const createdCalendar = await this.calendarsRepository.create(calendar);
    internship.calendar_id = createdCalendar.id;

    await this.internshipsRepository.save(internship);

    return createdCalendar;
  }
}

export default CreateInternshipCalendarService;
