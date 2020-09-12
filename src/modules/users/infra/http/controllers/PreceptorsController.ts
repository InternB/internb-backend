import { container } from 'tsyringe';
import { Request, Response } from 'express';

export default class PreceptorsController {
  public async registerToSchool(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id: user_id } = request.user;
    const { school_id } = request.params;

    // TODO
    console.log(user_id, school_id);

    return response.json();
  }
}
