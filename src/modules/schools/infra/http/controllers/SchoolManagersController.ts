import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateSchoolManagerService from '../../../services/CreateSchoolManagerService';

export default class SchoolManagerssController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { role, fullname, phone, email, school_id } = request.body;

    const createSchoolManagerService = container.resolve(
      CreateSchoolManagerService,
    );

    const school_manager = await createSchoolManagerService.execute({
      role,
      fullname,
      phone,
      email,
      school_id,
    });

    return response.json(school_manager);
  }
}
