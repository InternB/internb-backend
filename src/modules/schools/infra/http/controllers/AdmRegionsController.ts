import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateAdmRegionService from '../../../services/CreateAdmRegionService';

export default class AdmRegionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, cre } = request.body;

    const createAdmRegionService = container.resolve(CreateAdmRegionService);

    const adm_region = await createAdmRegionService.execute({ name, cre });

    return response.json(adm_region);
  }
}
