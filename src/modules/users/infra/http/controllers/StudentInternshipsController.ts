// import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ClassesRepository from '@modules/disciplines/infra/typeorm/repositories/ClassesRepository';
import StudentsRepository from '../../typeorm/repositories/StudentsRepository';

export default class StudentInternshipsController {
  public async create(request: Request, response: Response): Promise<Response> {
    return response.json();
  }
}
