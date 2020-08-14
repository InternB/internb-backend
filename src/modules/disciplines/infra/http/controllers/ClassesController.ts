import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateClassService from '@modules/disciplines/services/CreateClassService';
import ClassesRepository from '../../typeorm/repositories/ClassesRepository';

export default class ClassesController {
  public async index(request: Request, response: Response): Promise<Response> {
    return response.json();
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      id,
      semester,
      total_students_enrolled,
      discipline_id,
    } = request.body;
    const pdf_guide = request.file.filename;
    const professor_id = request.user.id;

    const createClass = container.resolve(CreateClassService);

    const newClass = await createClass.execute({
      id,
      semester,
      total_students_enrolled,
      discipline_id,
      professor_id,
      pdf_guide,
    });

    return response.status(201).json(newClass);
  }
}
