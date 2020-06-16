import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import CreateSchoolManagerService from './CreateSchoolManagerService';

import FakeSchoolManagersRepository from '../repositories/fakes/FakeSchoolManagersRepository';
import FakeSchoolsRepository from '../repositories/fakes/FakeSchoolsRepository';

let createSchoolManager: CreateSchoolManagerService;
let fakeSchoolManagersRepository: FakeSchoolManagersRepository;
let fakeSchoolsRepository: FakeSchoolsRepository;

describe('CreateSchoolManager', () => {
  beforeEach(() => {
    fakeSchoolManagersRepository = new FakeSchoolManagersRepository();
    fakeSchoolsRepository = new FakeSchoolsRepository();
    createSchoolManager = new CreateSchoolManagerService(
      fakeSchoolManagersRepository,
      fakeSchoolsRepository,
    );
  });

  it('should create a school manager for a given school', async () => {
    const { id: school_id } = await fakeSchoolsRepository.create({
      name: 'school-name',
      type: 0,
      adm_region_id: 'adm-region-id',
      address: 'school-address',
      cep: 'school-cep',
    });

    const school_manager = await createSchoolManager.execute({
      role: 0,
      fullname: 'John Doe',
      email: 'johndoe@gmail.com',
      phone: 'manager-phone',
      school_id,
    });

    expect(school_manager).toEqual(
      expect.objectContaining({
        role: 0,
        fullname: 'John Doe',
        email: 'johndoe@gmail.com',
        phone: 'manager-phone',
        school_id,
      }),
    );
  });

  it('should not create a school manager if the given school does not exist', async () => {
    await expect(
      createSchoolManager.execute({
        role: 0,
        fullname: 'John Doe',
        email: 'johndoe@gmail.com',
        phone: 'manager-phone',
        school_id: 'non-existing-school-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
