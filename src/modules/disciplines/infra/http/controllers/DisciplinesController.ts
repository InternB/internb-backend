import { container } from 'tsyringe';
import { Request, Response } from 'express';

import SearchDisciplinesService from '@modules/disciplines/services/SearchDisciplinesService';
import ListDisciplinesService from '../../../services/ListDisciplinesService';
import CreateDisciplineService from '../../../services/CreateDisciplineService';
import Discipline from '../../typeorm/entities/Discipline';

export default class DisciplinesController {
  public async index(_: Request, response: Response): Promise<Response> {
    const listDisciplines = container.resolve(ListDisciplinesService);

    const disciplines = await listDisciplines.execute();

    return response.json(disciplines);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { id, name } = request.body;

    const createDiscipline = container.resolve(CreateDisciplineService);

    const discipline = await createDiscipline.execute({ id, name });

    return response.status(201).json(discipline);
  }

  public async search(request: Request, response: Response): Promise<Response> {
    const { term } = request.query as {
      term: string;
    };

    const searchDisciplines = container.resolve(SearchDisciplinesService);

    const disciplines = await searchDisciplines.execute(term);

    return response.status(201).json(disciplines);
  }
}
