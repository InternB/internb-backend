import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ShowAdmRegionsService from '../../../services/ShowAdmRegionsService';
import CreateAdmRegionService from '../../../services/CreateAdmRegionService';

export default class AdmRegionsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { region_filter } = request.query;

    const showAdmRegionsService = container.resolve(ShowAdmRegionsService);

    const admRegions = await showAdmRegionsService.execute({
      region_filter: String(region_filter).toLowerCase(),
    });

    return response.json(admRegions);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { id: admin_id } = request.user;
    const { name, cre } = request.body;

    const createAdmRegionService = container.resolve(CreateAdmRegionService);

    const adm_region = await createAdmRegionService.execute({
      admin_id,
      name,
      cre,
    });

    return response.status(201).json(adm_region);
  }
}
