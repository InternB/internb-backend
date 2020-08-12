import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListDisciplinesService from '../../../services/ListDisciplinesService';

export default class DisciplinesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listDisciplines = container.resolve(ListDisciplinesService);

    const disciplines = await listDisciplines.execute();

    return response.json(disciplines);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    return response.status(201).json();
  }
}
