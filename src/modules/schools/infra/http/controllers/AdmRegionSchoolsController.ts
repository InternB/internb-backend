import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListSchoolsRegionService from '../../../services/ListSchoolsRegionService';

export default class AdmRegionSchoolsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id: adm_region_id } = request.params;

    const listSchoolsRegionService = container.resolve(
      ListSchoolsRegionService,
    );

    const schools = await listSchoolsRegionService.execute({
      adm_region_id,
    });

    return response.json(schools);
  }
}
