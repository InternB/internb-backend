import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeActivitiesRepository from '../repositories/fakes/FakeActivitiesRepository';
import FakeInternshipsRepository from '../repositories/fakes/FakeInternshipsRepository';

import CreateActivityOfInternshipService from './CreateActivityOfInternshipService';

let fakeInternshipsRepository: FakeInternshipsRepository;
let fakeActivitiesRepository: FakeActivitiesRepository;
let fakeStorageProvider: FakeStorageProvider;
let createActivityOfInternshipService: CreateActivityOfInternshipService;

describe('CreateActivityOfInternship', () => {
  beforeEach(() => {
    fakeInternshipsRepository = new FakeInternshipsRepository();
    fakeActivitiesRepository = new FakeActivitiesRepository();
    fakeStorageProvider = new FakeStorageProvider();
    createActivityOfInternshipService = new CreateActivityOfInternshipService(
      fakeInternshipsRepository,
      fakeActivitiesRepository,
      fakeStorageProvider,
    );
  });

  it('should create an activity related to a specific internship', async () => {
    const internship = await fakeInternshipsRepository.create({
      student_id: 'student-id',
      class_id: 'class-id',
      class_discipline_id: 'discipline-id',
      class_professor_id: 'professor-id',
    });
    internship.school_id = 'school-id';
    internship.preceptor_id = 'preceptor-id';
    await fakeInternshipsRepository.save(internship);
    const { id: internship_id } = internship;

    const response = await createActivityOfInternshipService.execute({
      internship_id,
      sign: 'class-sign',
      timestamp: Date.now(),
      description: 'Lorem ipsum',
      photo: 'photo.png',
    });

    expect(response).toEqual(
      expect.objectContaining({
        internship_id,
      }),
    );
  });

  it('should not create an activity if internship does not exist', async () => {
    await expect(
      createActivityOfInternshipService.execute({
        internship_id: 'invalid-internship-id',
        sign: 'class-sign',
        timestamp: Date.now(),
        description: 'Lorem ipsum',
        photo: 'photo.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not create an activity if intern is not registered to a school', async () => {
    const { id: internship_id } = await fakeInternshipsRepository.create({
      student_id: 'student-id',
      class_id: 'class-id',
      class_discipline_id: 'discipline-id',
      class_professor_id: 'professor-id',
    });

    await expect(
      createActivityOfInternshipService.execute({
        internship_id,
        sign: 'class-sign',
        timestamp: Date.now(),
        description: 'Lorem ipsum',
        photo: 'photo.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not create an activity if intern is not registered to a preceptor', async () => {
    const internship = await fakeInternshipsRepository.create({
      student_id: 'student-id',
      class_id: 'class-id',
      class_discipline_id: 'discipline-id',
      class_professor_id: 'professor-id',
    });
    internship.school_id = 'school-id';
    await fakeInternshipsRepository.save(internship);
    const { id: internship_id } = internship;

    await expect(
      createActivityOfInternshipService.execute({
        internship_id,
        sign: 'class-sign',
        timestamp: Date.now(),
        description: 'Lorem ipsum',
        photo: 'photo.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
