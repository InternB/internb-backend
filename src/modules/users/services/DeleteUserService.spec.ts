import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import DeleteUserService from './DeleteUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import User from '../infra/typeorm/entities/User';

let deleteUserService: DeleteUserService;
let fakeUsersRepository: FakeUsersRepository;

function createUser(active = true): User {
  const role = Math.floor(Math.random() * 4);

  const user = new User();
  Object.assign(user, {
    cpf: '29676193020',
    email: 'johndoe@gmail.com',
    password: '123456',
    fullname: 'John Doe',
    phone: '61999999999',
    role,
    active,
  });

  return user;
}

describe('DeleteUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    deleteUserService = new DeleteUserService(fakeUsersRepository);
  });

  it("should delete the authenticated user's account", async () => {
    const deleteUser = jest.spyOn(fakeUsersRepository, 'deleteUser');

    const user = createUser();

    const { id } = await fakeUsersRepository.create(user);

    await expect(deleteUserService.execute({ id })).resolves;
    await expect(deleteUser).toHaveBeenCalledWith(user);
  });

  it("should not delete the user if he/she doesn't exist", async () => {
    await expect(
      deleteUserService.execute({ id: 'non-existing-user-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
