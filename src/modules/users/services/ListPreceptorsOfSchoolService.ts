import { inject, injectable } from 'tsyringe';

import Preceptor from '@modules/users/infra/typeorm/entities/Preceptor';
import IPreceptorsRepository from '../repositories/IPreceptorsRepository';
import IGenericUsersRepository from '../repositories/IGenericUsersRepository';

interface IRequest {
  school_id: string;
}

@injectable()
class ListPreceptorsOfSchoolService {
  constructor(
    @inject('PreceptorsRepository')
    private preceptorsRepository: IPreceptorsRepository &
      IGenericUsersRepository<Preceptor>,
  ) {}

  public async execute({ school_id }: IRequest): Promise<Preceptor[]> {
    const preceptors = await this.preceptorsRepository.findBySchoolId(
      school_id,
    );

    return preceptors;
  }
}

export default ListPreceptorsOfSchoolService;
