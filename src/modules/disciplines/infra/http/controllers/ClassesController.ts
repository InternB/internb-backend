import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import CreateClassService from '@modules/disciplines/services/CreateClassService';
import ListClassesDisciplineService from '@modules/disciplines/services/ListClassesDisciplineService';

export default class ClassesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { discipline_id, professor_id } = request.query as {
      discipline_id: string;
      professor_id: string;
    };

    const listClassesDiscipline = container.resolve(
      ListClassesDisciplineService,
    );

    const classes = await listClassesDiscipline.execute({
      discipline_id,
      professor_id,
    });

    return response.json(classToClass(classes));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      id,
      semester,
      password,
      total_students_enrolled,
      discipline_id,
    } = request.body;
    const professor_id = request.user.id;

    const createClass = container.resolve(CreateClassService);

    const newClass = await createClass.execute({
      id,
      semester,
      password,
      total_students_enrolled,
      discipline_id,
      professor_id,
    });

    return response.status(201).json(classToClass(newClass));
  }
}
