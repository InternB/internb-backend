import { container } from 'tsyringe';
import { Request, Response } from 'express';
import RegisterPreceptorToSchoolService from '@modules/users/services/RegisterPreceptorToSchoolService';

export default class PreceptorsController {
  public async registerToSchool(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id: user_id } = request.user;
    const { school_id } = request.params;

    const registerPreceptorToSchoolService = container.resolve(
      RegisterPreceptorToSchoolService,
    );

    const preceptor = await registerPreceptorToSchoolService.execute({
      user_id,
      school_id,
    });

    return response.json(preceptor);
  }
}
