import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import UploadUserAvatarService from '@modules/users/services/UploadUserAvatarService';

class UserAvatarsController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const avatar = request.file.filename;

    const uploadUserAvatarService = container.resolve(UploadUserAvatarService);

    const user = await uploadUserAvatarService.execute({ id, avatar });

    return response.json(classToClass(user));
  }
}

export default UserAvatarsController;
