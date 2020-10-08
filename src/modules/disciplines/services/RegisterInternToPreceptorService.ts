import { inject, injectable } from 'tsyringe';

import Preceptor from '@modules/users/infra/typeorm/entities/Preceptor';
import IGenericUsersRepository from '@modules/users/repositories/IGenericUsersRepository';
import AppError from '@shared/errors/AppError';
import Internship from '../infra/typeorm/entities/Internship';
import IInternshipsRepository from '../repositories/IInternshipsRepository';

interface IRequest {
  internship_id: string;
  preceptor_id: string;
}

@injectable()
class RegisterInternToPreceptorService {
  constructor(
    @inject('PreceptorsRepository')
    private preceptorsRepository: IGenericUsersRepository<Preceptor>,

    @inject('InternshipsRepository')
    private internshipsRepository: IInternshipsRepository,
  ) {}

  public async execute({
    internship_id,
    preceptor_id,
  }: IRequest): Promise<Internship> {
    const internship = await this.internshipsRepository.findById(internship_id);
    if (!internship) throw new AppError('Internship not found', 404);
    if (!internship.school_id)
      throw new AppError('Intern not registerd to any school', 400);

    const preceptor = await this.preceptorsRepository.findById(preceptor_id);
    if (!preceptor) throw new AppError('Preceptor not found', 404);
    if (preceptor.school_id !== internship.school_id) {
      throw new AppError(
        'Preceptor does not work on same school as intern',
        400,
      );
    }

    internship.preceptor = preceptor;
    await this.internshipsRepository.save(internship);
    internship.preceptor_id = preceptor.id;

    return internship;
  }
}

export default RegisterInternToPreceptorService;
