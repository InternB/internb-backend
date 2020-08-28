// import { container } from 'tsyringe';
import { Request, Response } from 'express';

export default class StudentInternshipsController {
  public async create(request: Request, response: Response): Promise<Response> {
    //

    return response.status(201).json();
  }
}
