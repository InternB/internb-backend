import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateActivityOfInternshipService from '@modules/disciplines/services/CreateActivityOfInternshipService';

export default class ActivitiesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { internship_id, sign, timestamp, description } = request.body;
    const { filename: photo } = request.file;

    const createActivityOfInternshipService = container.resolve(
      CreateActivityOfInternshipService,
    );

    const activity = await createActivityOfInternshipService.execute({
      internship_id,
      sign,
      timestamp,
      description,
      photo,
    });

    return response.json(activity);
  }
}
