import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ShowUserService from '../../../services/ShowUsersService';
import CreateUserService from '../../../services/CreateUserService';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const {
      user: { id, role },
    } = request;

    const showUserService = await container.resolve(ShowUserService);

    const users = await showUserService.execute({ user_id: id, role });

    return response.json(users);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { cpf, email, password, fullname, phone, role } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      cpf,
      email,
      password,
      fullname,
      phone,
      role,
    });

    delete user.password;

    return response.json(user);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    return response.status(204);
  }
}
