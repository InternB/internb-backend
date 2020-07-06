import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import AdminDeletesUserService from './AdminDeletesUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let adminDeletesUserService: AdminDeletesUserService;

describe('AdminDeletesUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    adminDeletesUserService = new AdminDeletesUserService(fakeUsersRepository);
  });

  it('should delete another User', async () => {
    // const deleteUser = jest.spyOn(fakeUsersRepository, 'deleteUser');
    const randomRole = Math.floor(Math.random() * 4);

    const { id: admin_id } = await fakeUsersRepository.create({
      cpf: '06516661120',
      email: 'johndoe@gmail.com',
      password: '123456',
      fullname: 'John Doe',
      phone: '61999999999',
      role: 0,
      active: true,
    });

    const userToBeDeleted = await fakeUsersRepository.create({
      cpf: '29676193020',
      email: 'johntre@gmail.com',
      password: '123456',
      fullname: 'John Tré',
      phone: '61999999999',
      role: randomRole,
      active: true,
    });

    await expect(
      adminDeletesUserService.execute({
        admin_id,
        user_id: userToBeDeleted.id,
      }),
    ).resolves;
    // await expect(deleteUser).toHaveBeenCalledWith(userToBeDeleted);
  });

  it("should not delete the user if the admin doesn't exist", async () => {
    await expect(
      adminDeletesUserService.execute({
        admin_id: 'non-existing-admin-id',
        user_id: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not delete the user if the requester is not an Admin', async () => {
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
      adminDeletesUserService.execute({
        admin_id,
        user_id: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not delete the user if the user doesn't exist", async () => {
    const { id: admin_id } = await fakeUsersRepository.create({
      cpf: '06516661120',
      email: 'johndoe@gmail.com',
      password: '123456',
      fullname: 'John Doe',
      phone: '61999999999',
      role: 0,
      active: true,
    });

    await expect(
      adminDeletesUserService.execute({
        admin_id,
        user_id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not delete the user if he/she is inactive', async () => {
    const randomRole = Math.floor(Math.random() * 4);

    const { id: admin_id } = await fakeUsersRepository.create({
      cpf: '06516661120',
      email: 'johndoe@gmail.com',
      password: '123456',
      fullname: 'John Doe',
      phone: '61999999999',
      role: 0,
      active: true,
    });

    const { id: user_id } = await fakeUsersRepository.create({
      cpf: '29676193020',
      email: 'johntre@gmail.com',
      password: '123456',
      fullname: 'John Tré',
      phone: '61999999999',
      role: randomRole,
      active: false,
    });

    await expect(
      adminDeletesUserService.execute({ admin_id, user_id }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
