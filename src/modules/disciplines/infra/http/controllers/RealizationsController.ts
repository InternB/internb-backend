import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateRealizationOfInternshipService from '@modules/disciplines/services/CreateRealizationOfInternshipService';

export default class RealizationsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { internship_id, type, names } = request.body;

    const createRealizationOfInternshipService = container.resolve(
      CreateRealizationOfInternshipService,
    );

    const realization = await createRealizationOfInternshipService.execute({
      internship_id,
      type,
      names,
    });

    return response.json(realization);
  }
}
