import { container } from 'tsyringe';
import { Request, Response } from 'express';

import RegisterStudentInternshipService from '@modules/users/services/RegisterStudentInternshipService';
import RegisterInternToSchoolService from '@modules/users/services/RegisterInternToSchoolService';

export default class StudentInternshipsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { class_id, password } = request.body;
    const { id: user_id } = request.user;

    const registerStudentInternship = container.resolve(
      RegisterStudentInternshipService,
    );

    const internship = await registerStudentInternship.execute({
      user_id,
      class_id,
      password,
    });

    return response.status(201).json(internship);
  }

  public async addSchool(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { internship_id, school_id } = request.params;
    const { id: user_id } = request.user;

    const registerInternToSchool = container.resolve(
      RegisterInternToSchoolService,
    );

    const internship = await registerInternToSchool.execute({
      internship_id,
      school_id,
      user_id,
    });

    return response.json(internship);
  }
}
