import { container } from 'tsyringe';
import { Request, Response } from 'express';

import UpdateSchoolService from '@modules/schools/services/UpdateSchoolService';
import ShowSchoolService from '../../../services/ShowSchoolService';
import CreateSchoolService from '../../../services/CreateSchoolService';
import ListAllSchoolsService from '../../../services/ListAllSchoolsService';

export default class SchoolsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listAllSchoolsSerive = container.resolve(ListAllSchoolsService);

    const schools = await listAllSchoolsSerive.execute();

    return response.json(schools);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showSchoolService = container.resolve(ShowSchoolService);

    const school = await showSchoolService.execute({ id });

    return response.status(201).json(school);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { id: admin_id } = request.user;
    const { name, adm_region_id, cep, address, phone, email } = request.body;

    const createSchoolService = container.resolve(CreateSchoolService);

    const school = await createSchoolService.execute({
      admin_id,
      name,
      adm_region_id,
      cep,
      address,
      phone,
      email,
    });

    return response.json(school);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, adm_region_id, address, cep, email, phone } = request.body;

    const updateSchoolService = container.resolve(UpdateSchoolService);

    const school = await updateSchoolService.execute({
      id,
      name,
      adm_region_id,
      address,
      cep,
      email,
      phone,
    });

    return response.json(school);
  }
}
