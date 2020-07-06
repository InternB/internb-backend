import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import DeleteUserService from './DeleteUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let deleteUserService: DeleteUserService;
let fakeUsersRepository: FakeUsersRepository;

describe('DeleteUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    deleteUserService = new DeleteUserService(fakeUsersRepository);
  });

  it("should delete the authenticated user's account", async () => {
    const deleteUser = jest.spyOn(fakeUsersRepository, 'deleteUser');
    const randomRole = Math.floor(Math.random() * 4);

    const user = await fakeUsersRepository.create({
      cpf: '06516661120',
      email: 'johndoe@gmail.com',
      password: '123456',
      fullname: 'John Doe',
      phone: '61999999999',
      role: randomRole,
      active: true,
    });

    await expect(deleteUserService.execute({ id: user.id })).resolves;
    await expect(deleteUser).toHaveBeenCalledWith(user);
  });

  it('should not delete the user if he/she is inactive', async () => {
    await expect(
      deleteUserService.execute({ id: 'non-existing-user-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not delete the user if he/she doesn't exist", async () => {
    const randomRole = Math.floor(Math.random() * 4);

    const { id } = await fakeUsersRepository.create({
      cpf: '06516661120',
      email: 'johndoe@gmail.com',
      password: '123456',
      fullname: 'John Doe',
      phone: '61999999999',
      role: randomRole,
      active: false,
    });

    await expect(deleteUserService.execute({ id })).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
