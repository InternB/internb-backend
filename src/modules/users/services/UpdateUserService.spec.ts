import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import UpdateUserService from './UpdateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let updateUserService: UpdateUserService;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

describe('UpdateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateUserService = new UpdateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it("should update the user's account information", async () => {
    const role = Math.floor(Math.random() * 4);

    const { id } = await fakeUsersRepository.create({
      cpf: '72831300045',
      email: 'johndoe@example.com',
      fullname: 'John Doe',
      password: '123456',
      phone: 'some-phone',
      role,
      active: true,
    });

    const updatedUser = await updateUserService.execute({
      id,
      fullname: 'new-user-fullname',
      email: 'new-user-email',
      phone: 'new-user-phone',
      old_password: '123456',
      new_password: 'new-user-password',
    });

    expect(updatedUser).toEqual(
      expect.objectContaining({
        id,
        fullname: 'new-user-fullname',
        email: 'new-user-email',
        phone: 'new-user-phone',
        password: 'new-user-password',
      }),
    );
  });

  it("should update the user's account if old password and new password are not provided", async () => {
    const role = Math.floor(Math.random() * 4);

    const { id } = await fakeUsersRepository.create({
      cpf: '72831300045',
      email: 'johndoe@example.com',
      fullname: 'John Doe',
      password: '123456',
      phone: 'some-phone',
      role,
      active: true,
    });

    const updatedUser = await updateUserService.execute({
      id,
      fullname: 'new-user-fullname',
      email: 'new-user-email',
      phone: 'new-user-phone',
    });

    expect(updatedUser).toEqual(
      expect.objectContaining({
        id,
        fullname: 'new-user-fullname',
        email: 'new-user-email',
        phone: 'new-user-phone',
        password: '123456',
      }),
    );
  });

  it("should not update the user's account if the provided e-mail is not unique", async () => {
    const role = Math.floor(Math.random() * 4);

    const { id } = await fakeUsersRepository.create({
      cpf: '72831300045',
      email: 'johndoe@example.com',
      fullname: 'John Doe',
      password: '123456',
      phone: 'some-phone',
      role,
      active: true,
    });

    await fakeUsersRepository.create({
      cpf: '29676193020',
      email: 'johntre@example.com',
      fullname: 'John Tré',
      password: '123456',
      phone: 'some-phone',
      role,
      active: true,
    });

    await expect(
      updateUserService.execute({
        id,
        fullname: 'new-user-fullname',
        email: 'johntre@example.com',
        phone: 'new-user-phone',
        old_password: '123456',
        new_password: 'new-user-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not update the user's account information if it does not exist", async () => {
    await fakeUsersRepository.create({
      cpf: '72831300045',
      email: 'johndoe@example.com',
      fullname: 'John Doe',
      password: '123456',
      phone: 'some-phone',
      role: Math.floor(Math.random() * 4),
      active: true,
    });

    await expect(
      updateUserService.execute({
        id: 'non-existing-user-id',
        fullname: 'new-user-fullname',
        email: 'new-user-email',
        phone: 'new-user-phone',
        old_password: '123456',
        new_password: 'new-user-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not update the user's password if the old password does not match", async () => {
    const role = Math.floor(Math.random() * 4);

    const { id } = await fakeUsersRepository.create({
      cpf: '72831300045',
      email: 'johndoe@example.com',
      fullname: 'John Doe',
      password: '123456',
      phone: 'some-phone',
      role,
      active: true,
    });

    await expect(
      updateUserService.execute({
        id,
        fullname: 'new-user-fullname',
        email: 'new-user-email',
        phone: 'new-user-phone',
        old_password: '1234567',
        new_password: 'new-user-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
