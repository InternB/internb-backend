import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';
import CreateSchoolService from './CreateSchoolService';
import FakeSchoolsRepository from '../repositories/fakes/FakeSchoolsRepository';
import FakeAdmRegionsRepository from '../repositories/fakes/FakeAdmRegionsRepository';

let createSchoolService: CreateSchoolService;
let fakeSchoolsRepository: FakeSchoolsRepository;
let fakeAdmRegionsRepository: FakeAdmRegionsRepository;
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

describe('CreateSchool', () => {
  beforeEach(() => {
    fakeSchoolsRepository = new FakeSchoolsRepository();
    fakeAdmRegionsRepository = new FakeAdmRegionsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    createSchoolService = new CreateSchoolService(
      fakeSchoolsRepository,
      fakeAdmRegionsRepository,
      fakeUsersRepository,
    );
  });

  it('should create a public school in a specific Adminstrative Region', async () => {
    const admin = createAdmin();

    const { id: admin_id } = await fakeUsersRepository.create(admin);

    const { id: adm_region_id } = await fakeAdmRegionsRepository.create({
      name: 'adm-region-name',
      cre: true,
    });

    const school = await createSchoolService.execute({
      admin_id,
      name: 'school-name',
      adm_region_id,
      cep: 'school-cep',
      address: 'school-address',
      phone: 'school-phone',
      email: 'school-email',
    });

    expect(school).toEqual(
      expect.objectContaining({
        name: 'school-name',
        adm_region_id,
        cep: 'school-cep',
        address: 'school-address',
        phone: 'school-phone',
        email: 'school-email',
      }),
    );
  });

  it('should create a private school in a specific Admnistrative Region', async () => {
    const admin = createAdmin();

    const { id: admin_id } = await fakeUsersRepository.create(admin);

    const { id: adm_region_id } = await fakeAdmRegionsRepository.create({
      name: 'adm-region-name',
      cre: false,
    });

    const school = await createSchoolService.execute({
      admin_id,
      name: 'school-name',
      adm_region_id,
      cep: 'school-cep',
      address: 'school-address',
      phone: 'school-phone',
      email: 'school-email',
    });

    expect(school).toEqual(
      expect.objectContaining({
        name: 'school-name',
        adm_region_id,
        cep: 'school-cep',
        address: 'school-address',
        phone: 'school-phone',
        email: 'school-email',
      }),
    );
  });

  it("should create a school if there's no phone to attach", async () => {
    const admin = createAdmin();

    const { id: admin_id } = await fakeUsersRepository.create(admin);

    const type = Math.floor(Math.random() * 4);

    const { id: adm_region_id } = await fakeAdmRegionsRepository.create({
      name: 'adm-region-name',
      cre: type === 0,
    });

    const school = await createSchoolService.execute({
      admin_id,
      name: 'school-name',
      adm_region_id,
      cep: 'school-cep',
      address: 'school-address',
      phone: 'school-phone',
    });

    expect(school).toEqual(
      expect.objectContaining({
        name: 'school-name',
        adm_region_id,
        cep: 'school-cep',
        address: 'school-address',
        phone: 'school-phone',
        email: undefined,
      }),
    );
  });

  it("should create a school if there's no email to attach", async () => {
    const admin = createAdmin();

    const { id: admin_id } = await fakeUsersRepository.create(admin);

    const type = Math.floor(Math.random() * 4);

    const { id: adm_region_id } = await fakeAdmRegionsRepository.create({
      name: 'adm-region-name',
      cre: type === 0,
    });

    const school = await createSchoolService.execute({
      admin_id,
      name: 'school-name',
      adm_region_id,
      cep: 'school-cep',
      address: 'school-address',
      email: 'school-email',
    });

    expect(school).toEqual(
      expect.objectContaining({
        name: 'school-name',
        adm_region_id,
        cep: 'school-cep',
        address: 'school-address',
        phone: undefined,
        email: 'school-email',
      }),
    );
  });

  it('should not create a school if the Admin does not exist', async () => {
    const type = Math.floor(Math.random() * 4);

    const { id: adm_region_id } = await fakeAdmRegionsRepository.create({
      name: 'adm-region-name',
      cre: type === 0,
    });

    await expect(
      createSchoolService.execute({
        admin_id: 'non-existing-admin-id',
        name: 'school-name',
        adm_region_id,
        cep: 'school-cep',
        address: 'school-address',
        phone: 'school-phone',
        email: 'school-email',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not create a school if the Adminstrative Region does not exist', async () => {
    const admin = createAdmin();

    const { id: admin_id } = await fakeUsersRepository.create(admin);

    await expect(
      createSchoolService.execute({
        admin_id,
        name: 'school-name',
        adm_region_id: 'non-existing-adm-region-id',
        cep: 'school-cep',
        address: 'school-address',
        phone: 'school-phone',
        email: 'school-email',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
