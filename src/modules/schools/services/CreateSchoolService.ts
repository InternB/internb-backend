import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import School from '../infra/typeorm/entities/School';

import ISchoolsRepository from '../repositories/ISchoolsRepository';
import IAdmRegionsRepository from '../repositories/IAdmRegionsRepository';

interface IRequest {
  admin_id: string;
  type: number;
  name: string;
  adm_region_id: string;
  cep: string;
  address: string;
  phone?: string;
  email?: string;
}

@injectable()
class CreateSchoolService {
  constructor(
    @inject('SchoolsRepository')
    private schoolsRepository: ISchoolsRepository,

    @inject('AdmRegionsRepository')
    private admRegionsRepository: IAdmRegionsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    admin_id,
    type,
    name,
    adm_region_id,
    cep,
    address,
    phone,
    email,
  }: IRequest): Promise<School> {
    const user = await this.usersRepository.findById(admin_id);

    if (!user) throw new AppError('Admin does not exist', 400);

    if (user.role !== 0)
      throw new AppError(
        'Only Admins can register Administrative Regions',
        403,
      );

    if (!user.active) throw new AppError('Admin account must be active');

    const adm_region = await this.admRegionsRepository.findById(adm_region_id);

    if (!adm_region) throw new AppError('Região Adminstrativa não cadastrada');

    if (type === 0 && !adm_region.cre)
      throw new AppError(
        'Não é possível adicionar uma escola pública fora da CRE',
      );

    if (type !== 0 && adm_region.cre)
      throw new AppError(
        'Não é possível adicionar uma escola privada, instuto federal ou outra em uma CRE',
      );

    const school = await this.schoolsRepository.create({
      type,
      name,
      adm_region_id,
      cep,
      address,
      phone,
      email,
    });

    return school;
  }
}

export default CreateSchoolService;
