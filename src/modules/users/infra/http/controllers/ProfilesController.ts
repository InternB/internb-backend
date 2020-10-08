import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import UpdateUserService from '../../../services/UpdateUserService';
import ShowUserService from '../../../services/ShowUserService';

class ProfilesController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const showUserService = container.resolve(ShowUserService);

    const user = await showUserService.execute({ id });

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { fullname, email, phone, old_password, new_password } = request.body;

    const updateUserService = container.resolve(UpdateUserService);

    const user = await updateUserService.execute({
      id,
      fullname,
      email,
      phone,
      old_password,
      new_password,
    });

    return response.json(classToClass(user));
  }
}

export default ProfilesController;
