import School from '@modules/schools/infra/typeorm/entities/School';
import FakeSchoolsRepository from '@modules/schools/repositories/fakes/FakeSchoolsRepository';
import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import User from '../infra/typeorm/entities/User';
import FakePreceptorsRepository from '../repositories/fakes/FakePreceptorsRepository';

import RegisterPreceptorToSchoolService from './RegisterPreceptorToSchoolService';

let fakePreceptorsRepository: FakePreceptorsRepository;
let fakeSchoolsRepository: FakeSchoolsRepository;
let registerPreceptorToSchoolService: RegisterPreceptorToSchoolService;

describe('RegisterPreceptorToSchool', () => {
  beforeEach(() => {
    fakePreceptorsRepository = new FakePreceptorsRepository();
    fakeSchoolsRepository = new FakeSchoolsRepository();
    registerPreceptorToSchoolService = new RegisterPreceptorToSchoolService(
      fakePreceptorsRepository,
      fakeSchoolsRepository,
    );
  });

  it('should register preceptor to a specific school', async () => {
    const { user_id } = await fakePreceptorsRepository.createUserOfType({
      user_id: 'user-id',
      experience: 1,
      formation: 'nível de formação',
      school_id: 'school-id',
      user: new User(),
      school: new School(),
      internships: [],
    });

    const { id: school_id } = await fakeSchoolsRepository.create({
      name: 'school-name',
      adm_region_id: 'adm-region-id',
      address: 'school-address',
      cep: 'school-cep',
    });

    const response = await registerPreceptorToSchoolService.execute({
      user_id,
      school_id,
    });

    expect(response).toEqual(
      expect.objectContaining({
        school_id,
      }),
    );
  });

  it('should not register preceptor to school if preceptor does not exist', async () => {
    await expect(
      registerPreceptorToSchoolService.execute({
        user_id: 'invalid-preceptor-id',
        school_id: 'school-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not register preceptor to school if it does not exist', async () => {
    const { user_id } = await fakePreceptorsRepository.createUserOfType({
      user_id: 'user-id',
      experience: 1,
      formation: 'nível de formação',
      school_id: 'school-id',
      user: new User(),
      school: new School(),
      internships: [],
    });

    await expect(
      registerPreceptorToSchoolService.execute({
        user_id,
        school_id: 'invalid-school-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
