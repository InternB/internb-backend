import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateSchoolService from '../../../services/CreateSchoolService';

export default class SchoolsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      type,
      name,
      adm_region_id,
      cep,
      address,
      phone,
      email,
    } = request.body;

    const createSchoolService = container.resolve(CreateSchoolService);

    const school = await createSchoolService.execute({
      type,
      name,
      adm_region_id,
      cep,
      address,
      phone,
      email,
    });

    return response.json(school);
  }
}
