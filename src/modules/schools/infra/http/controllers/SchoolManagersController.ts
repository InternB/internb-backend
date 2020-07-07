import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ShowSchoolManagerService from '@modules/schools/services/ShowSchoolManagerService';
import UpdateSchoolManagerService from '@modules/schools/services/UpdateSchoolManagerService';
import CreateSchoolManagerService from '../../../services/CreateSchoolManagerService';

export default class SchoolManagerssController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id: admin_id } = request.user;
    const { role, fullname, phone, email, school_id } = request.body;

    const createSchoolManagerService = container.resolve(
      CreateSchoolManagerService,
    );

    const school_manager = await createSchoolManagerService.execute({
      admin_id,
      role,
      fullname,
      phone,
      email,
      school_id,
    });

    return response.json(school_manager);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showSchoolManagerService = container.resolve(
      ShowSchoolManagerService,
    );

    const schoolManager = await showSchoolManagerService.execute({ id });

    return response.json(schoolManager);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { role, fullname, phone, email } = request.body;

    const updateSchoolManager = container.resolve(UpdateSchoolManagerService);

    const schoolManager = await updateSchoolManager.execute({
      id,
      role,
      fullname,
      phone,
      email,
    });

    return response.json(schoolManager);
  }
}
