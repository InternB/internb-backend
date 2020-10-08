import { getRepository, Repository } from 'typeorm';

import IActivitiesRepository from '@modules/disciplines/repositories/IActivitiesRepository';
import ICreateActivityDTO from '@modules/disciplines/dtos/ICreateActivityDTO';
import Activity from '../entities/Actvitity';

class ActivitiesRepository implements IActivitiesRepository {
  private ormRepository: Repository<Activity>;

  constructor() {
    this.ormRepository = getRepository(Activity);
  }

  public async create(data: ICreateActivityDTO): Promise<Activity> {
    let activity = new Activity();
    Object.assign(activity, data);

    activity = this.ormRepository.create(activity);
    await this.ormRepository.save(activity);

    return activity;
  }

  public async save(activity: Activity): Promise<Activity> {
    return this.ormRepository.save(activity);
  }
}

export default ActivitiesRepository;
