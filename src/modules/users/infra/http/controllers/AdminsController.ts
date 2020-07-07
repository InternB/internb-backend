import { container } from 'tsyringe';
import { Request, Response } from 'express';

import AdminDeletesUserService from '@modules/users/services/AdminDeletesUserService';
import ActivateUserService from '@modules/users/services/ActivateUserService';

export default class AdminsController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const activateUserService = container.resolve(ActivateUserService);

    await activateUserService.execute({ id });

    return response.status(204).send();
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const admin_id = request.user.id;
    const user_id = request.params.id;

    const adminDeletesUserService = container.resolve(AdminDeletesUserService);

    await adminDeletesUserService.execute({ admin_id, user_id });

    return response.status(204).send();
  }
}
