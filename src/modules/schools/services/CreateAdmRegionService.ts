import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import AppError from '@shared/errors/AppError';
import AdmRegion from '../infra/typeorm/entities/AdmRegion';
import IAdmRegionsRepository from '../repositories/IAdmRegionsRepository';

interface IRequest {
  admin_id: string;
  name: string;
  cre: boolean;
}

@injectable()
class CreateAdmRegionService {
  constructor(
    @inject('AdmRegionsRepository')
    private admRegionsRepository: IAdmRegionsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ admin_id, name, cre }: IRequest): Promise<AdmRegion> {
    const user = await this.usersRepository.findById(admin_id);

    if (!user) throw new AppError('Admin does not exist');

    if (user.role !== 0)
      throw new AppError(
        'Only Admins can register Administrative Regions',
        403,
      );

    if (!user.active) throw new AppError('Admin account must be active');

    const adm_region = await this.admRegionsRepository.create({ name, cre });

    return adm_region;
  }
}

export default CreateAdmRegionService;
