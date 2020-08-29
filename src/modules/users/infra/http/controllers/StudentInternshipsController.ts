import { container } from 'tsyringe';
import { Request, Response } from 'express';

import RegisterStudentInternshipService from '@modules/users/services/RegisterStudentInternshipService';

export default class StudentInternshipsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { class_id, password } = request.body;
    const student_id = '252354e6-a02b-44a5-b269-f19b763a61e2';

    const registerStudentInternship = container.resolve(
      RegisterStudentInternshipService,
    );

    const internship = await registerStudentInternship.execute({
      student_id,
      class_id,
      password,
    });

    return response.status(201).json(internship);
  }
}
