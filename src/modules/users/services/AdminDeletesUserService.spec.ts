import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import AdminDeletesUserService from './AdminDeletesUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import User from '../infra/typeorm/entities/User';

let fakeUsersRepository: FakeUsersRepository;
let adminDeletesUserService: AdminDeletesUserService;

function createAdmin(): User {
  const admin = new User();
  Object.assign(admin, {
    cpf: '06516661120',
    email: 'johndoe@gmail.com',
    password: '123456',
    fullname: 'John Doe',
    phone: '61999999999',
    role: 0,
    active: true,
  });

  return admin;
}

function createUser(active = true): User {
  const role = Math.floor(Math.random() * 4);

  const user = new User();
  Object.assign(user, {
    cpf: '29676193020',
    email: 'johntre@gmail.com',
    password: '123456',
    fullname: 'John Tré',
    phone: '61999999999',
    role,
    active,
  });

  return user;
}

describe('AdminDeletesUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    adminDeletesUserService = new AdminDeletesUserService(fakeUsersRepository);
  });

  it('should delete another User', async () => {
    const admin = createAdmin();

    const user = createUser();

    const { id: admin_id } = await fakeUsersRepository.create(admin);

    const userToBeDeleted = await fakeUsersRepository.create(user);

    await expect(
      adminDeletesUserService.execute({
        admin_id,
        user_id: userToBeDeleted.id,
      }),
    ).resolves;
  });

  it("should not delete the user if the admin doesn't exist", async () => {
    await expect(
      adminDeletesUserService.execute({
        admin_id: 'non-existing-admin-id',
        user_id: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not delete the user if the user doesn't exist", async () => {
    const admin = createAdmin();

    const { id: admin_id } = await fakeUsersRepository.create(admin);

    await expect(
      adminDeletesUserService.execute({
        admin_id,
        user_id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not delete the user if he/she is inactive', async () => {
    const admin = createAdmin();

    const user = createUser(false);

    const { id: admin_id } = await fakeUsersRepository.create(admin);

    const { id: user_id } = await fakeUsersRepository.create(user);

    await expect(
      adminDeletesUserService.execute({ admin_id, user_id }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
