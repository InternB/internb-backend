import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import RegisterPreceptorToSchoolService from '@modules/users/services/RegisterPreceptorToSchoolService';
import ListPreceptorsOfSchoolService from '@modules/users/services/ListPreceptorsOfSchoolService';

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

  public async listPreceptorsOfSchool(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { school_id } = request.params;

    const listPreceptorsOfSchool = container.resolve(
      ListPreceptorsOfSchoolService,
    );

    const preceptors = await listPreceptorsOfSchool.execute({ school_id });

    return response.json(classToClass(preceptors));
  }
}
