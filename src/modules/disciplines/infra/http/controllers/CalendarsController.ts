import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateInternshipCalendarService from '@modules/disciplines/services/CreateInternshipCalendarService';

export default class CalendarsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { internship_id, starts_at, finishes_at } = request.body;

    const createInternshipCalendarService = container.resolve(
      CreateInternshipCalendarService,
    );

    const calendar = await createInternshipCalendarService.execute({
      internship_id,
      calendar: { starts_at, finishes_at },
    });

    return response.json(calendar);
  }
}
