import ICreateActivityDTO from '@modules/disciplines/dtos/ICreateActivityDTO';
import Activity from '@modules/disciplines/infra/typeorm/entities/Actvitity';
import { v4 } from 'uuid';
import IActivitiesRepository from '../IActivitiesRepository';

class FakeActivitiesRepository implements IActivitiesRepository {
  private activities: Activity[] = [];

  public async create(data: ICreateActivityDTO): Promise<Activity> {
    const activity = new Activity();
    Object.assign(activity, {
      id: v4(),
      ...data,
    });
    this.activities.push(activity);
    return activity;
  }

  public async save(activity: Activity): Promise<Activity> {
    const idx = this.activities.findIndex(x => x.id === activity.id);
    this.activities[idx] = activity;
    return activity;
  }
}

export default FakeActivitiesRepository;
