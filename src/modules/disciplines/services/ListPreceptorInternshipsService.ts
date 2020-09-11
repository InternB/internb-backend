import { inject, injectable } from 'tsyringe';

import Preceptor from '@modules/users/infra/typeorm/entities/Preceptor';
import IGenericUsersRepository from '@modules/users/repositories/IGenericUsersRepository';
import AppError from '@shared/errors/AppError';
import Internship from '../infra/typeorm/entities/Internship';
import IInternshipsRepository from '../repositories/IInternshipsRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ListPreceptorInternshipsService {
  constructor(
    @inject('PreceptorsRepository')
    private preceptorsRepository: IGenericUsersRepository<Preceptor>,

    @inject('InternshipsRepository')
    private internshipsRepository: IInternshipsRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Internship[]> {
    const preceptor = await this.preceptorsRepository.findUserOfTypeById(
      user_id,
    );
    if (!preceptor) throw new AppError('Preceptor not found', 404);

    const internships = await this.internshipsRepository.findAllInternsOfPreceptor(
      preceptor.id,
    );

    return internships;
  }
}

export default ListPreceptorInternshipsService;
