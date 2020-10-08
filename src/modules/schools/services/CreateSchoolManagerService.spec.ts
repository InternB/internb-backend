import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';
import CreateSchoolManagerService from './CreateSchoolManagerService';
import FakeSchoolManagersRepository from '../repositories/fakes/FakeSchoolManagersRepository';
import FakeSchoolsRepository from '../repositories/fakes/FakeSchoolsRepository';

let createSchoolManager: CreateSchoolManagerService;
let fakeSchoolManagersRepository: FakeSchoolManagersRepository;
let fakeSchoolsRepository: FakeSchoolsRepository;
let fakeUsersRepository: FakeUsersRepository;

function createAdmin(active = true): User {
  const admin = new User();
  Object.assign(admin, {
    cpf: '29676193020',
    email: 'johndoe@gmail.com',
    password: '123456',
    fullname: 'John Doe',
    phone: '61999999999',
    role: 0,
    active,
  });

  return admin;
}

describe('CreateSchoolManager', () => {
  beforeEach(() => {
    fakeSchoolManagersRepository = new FakeSchoolManagersRepository();
    fakeSchoolsRepository = new FakeSchoolsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    createSchoolManager = new CreateSchoolManagerService(
      fakeSchoolManagersRepository,
      fakeSchoolsRepository,
      fakeUsersRepository,
    );
  });

  it('should create a school manager for a given school', async () => {
    const admin = createAdmin();

    const { id: admin_id } = await fakeUsersRepository.create(admin);

    const { id: school_id } = await fakeSchoolsRepository.create({
      name: 'school-name',
      adm_region_id: 'adm-region-id',
      address: 'school-address',
      cep: 'school-cep',
    });

    const school_manager = await createSchoolManager.execute({
      admin_id,
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

  it('should not create a school manager if the Admin does not exist', async () => {
    const { id: school_id } = await fakeSchoolsRepository.create({
      name: 'school-name',
      adm_region_id: 'adm-region-id',
      address: 'school-address',
      cep: 'school-cep',
    });

    await expect(
      createSchoolManager.execute({
        admin_id: 'non-existing-admin-id',
        role: 0,
        fullname: 'John Doe',
        email: 'johndoe@gmail.com',
        phone: 'manager-phone',
        school_id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not create a school manager if the given school does not exist', async () => {
    const admin = createAdmin();

    const { id: admin_id } = await fakeUsersRepository.create(admin);

    await expect(
      createSchoolManager.execute({
        admin_id,
        role: 0,
        fullname: 'John Doe',
        email: 'johndoe@gmail.com',
        phone: 'manager-phone',
        school_id: 'non-existing-school-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
