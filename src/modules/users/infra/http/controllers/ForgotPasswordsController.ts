import { Request, Response } from 'express';

export default class ForgotPasswordsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    return response.json(email);
  }
}
