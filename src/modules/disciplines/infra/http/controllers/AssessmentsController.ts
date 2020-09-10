import { container } from 'tsyringe';
import { Request, Response } from 'express';

export default class AssessmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    // TODO

    return response.json();
  }
}
