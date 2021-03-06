import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import ShowUserService from '../../../services/ShowUsersService';
import CreateUserService from '../../../services/CreateUserService';
import DeleteUserService from '../../../services/DeleteUserService';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const {
      user: { id },
    } = request;

    const showUserService = await container.resolve(ShowUserService);

    const users = await showUserService.execute({ user_id: id });

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

    return response.status(201).json(classToClass(user));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const deleteUserService = container.resolve(DeleteUserService);

    await deleteUserService.execute({ id });

    return response.status(204).send();
  }
}
