import { container } from 'tsyringe';
import { Request, Response } from 'express';

import RegisterStudentInternshipService from '@modules/users/services/RegisterStudentInternshipService';

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
}
