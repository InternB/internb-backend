import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateUserService from '../../../services/CreateUserService';

export default class UsersController {
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
}
