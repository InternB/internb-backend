import ICreateActivityDTO from '../dtos/ICreateActivityDTO';
import Activity from '../infra/typeorm/entities/Actvitity';

export default interface IActivitiesRepository {
  create(data: ICreateActivityDTO): Promise<Activity>;
  save(activity: Activity): Promise<Activity>;
}
