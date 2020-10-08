import { inject, injectable } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/model/IStorageProvider';
import AppError from '@shared/errors/AppError';
import Activity from '../infra/typeorm/entities/Actvitity';
import IInternshipsRepository from '../repositories/IInternshipsRepository';
import IActivitiesRepository from '../repositories/IActivitiesRepository';

interface IRequest {
  internship_id: string;
  sign: string;
  timestamp: number;
  description: string;
  photo: string;
}

@injectable()
class CreateActivityOfInternshipService {
  constructor(
    @inject('InternshipsRepository')
    private internshipsRepository: IInternshipsRepository,

    @inject('ActivitiesRepository')
    private activitiesRepository: IActivitiesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    internship_id,
    sign,
    timestamp,
    description,
    photo,
  }: IRequest): Promise<Activity> {
    const internship = await this.internshipsRepository.findById(internship_id);
    if (!internship) throw new AppError('Internship not found', 404);
    if (!internship.school_id)
      throw new AppError('Intern not registered to a school yet', 400);
    if (!internship.preceptor_id)
      throw new AppError('Intern not registered to a preceptor yet', 400);

    const stored_photo = await this.storageProvider.saveFile(photo);

    const activity = await this.activitiesRepository.create({
      internship_id,
      sign,
      timestamp,
      description,
      photo: stored_photo,
    });

    return activity;
  }
}

export default CreateActivityOfInternshipService;
