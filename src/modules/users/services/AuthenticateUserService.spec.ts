import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import AuthenticateUserService from './AuthenticateUserService';
import User from '../infra/typeorm/entities/User';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUserService: AuthenticateUserService;

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

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should authenticate the user', async () => {
    const user = createUser();

    await fakeUsersRepository.create(user);

    const auth = await authenticateUserService.execute({
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    expect(auth).toEqual(
      expect.objectContaining({
        user: expect.objectContaining({
          email: 'johndoe@gmail.com',
          fullname: 'John Doe',
          phone: '61999999999',
        }),
        token: expect.any(String),
      }),
    );
  });

  it('should not authenticate if user does not exist', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'johndoe@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not authenticate if password is invalid', async () => {
    const user = createUser();

    await fakeUsersRepository.create(user);

    await expect(
      authenticateUserService.execute({
        email: 'johndoe@gmail.com',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not authenticate if user is not active', async () => {
    const user = createUser(false);

    await fakeUsersRepository.create(user);

    await expect(
      authenticateUserService.execute({
        email: 'johndoe@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
