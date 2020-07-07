import 'reflect-metadata';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';

import CreateAdmRegionService from './CreateAdmRegionService';
import FakeAdmRegionsRepository from '../repositories/fakes/FakeAdmRegionsRepository';

let createAdmRegionService: CreateAdmRegionService;
let fakeAdmRegionsRepository: FakeAdmRegionsRepository;
let fakeUsersRepository: FakeUsersRepository;

describe('CreateAdmRegion', () => {
  beforeEach(() => {
    fakeAdmRegionsRepository = new FakeAdmRegionsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    createAdmRegionService = new CreateAdmRegionService(
      fakeAdmRegionsRepository,
      fakeUsersRepository,
    );
  });

  it('should create a new Adminstrative Region', async () => {
    const { id: admin_id } = await fakeUsersRepository.create({
      cpf: '06516661120',
      email: 'johndoe@gmail.com',
      password: '123456',
      fullname: 'John Doe',
      phone: '61999999999',
      role: 0,
      active: true,
    });

    const adm_region = await createAdmRegionService.execute({
      admin_id,
      name: 'adm-region-name',
      cre: true,
    });

    expect(adm_region).toEqual(
      expect.objectContaining({
        name: 'adm-region-name',
        cre: true,
      }),
    );
  });

  it('should not create a new Administrative Region if the Admin does not exist', async () => {
    await expect(
      createAdmRegionService.execute({
        admin_id: 'non-existing-admin-id',
        name: 'adm-region-name',
        cre: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not create a new Adminstrative Region if the user is not an Admin', async () => {
    const { id: admin_id } = await fakeUsersRepository.create({
      cpf: '06516661120',
      email: 'johndoe@gmail.com',
      password: '123456',
      fullname: 'John Doe',
      phone: '61999999999',
      role: Math.floor(Math.random() * 3 + 1),
      active: true,
    });

    await expect(
      createAdmRegionService.execute({
        admin_id,
        name: 'adm-region-name',
        cre: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not create a new Adminstrative Region if the Admin is inactive', async () => {
    const { id: admin_id } = await fakeUsersRepository.create({
      cpf: '06516661120',
      email: 'johndoe@gmail.com',
      password: '123456',
      fullname: 'John Doe',
      phone: '61999999999',
      role: 0,
      active: false,
    });

    await expect(
      createAdmRegionService.execute({
        admin_id,
        name: 'adm-region-name',
        cre: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
