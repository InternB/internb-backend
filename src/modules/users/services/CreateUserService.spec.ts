import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';

import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let createUserService: CreateUserService;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should create a new user', async () => {
    const user = await createUserService.execute({
      cpf: '06516661120',
      email: 'johndoe@gmail.com',
      password: '123456',
      fullname: 'John Doe',
      phone: '61999999999',
      role: 0,
    });

    const checkHash = await fakeHashProvider.compareHash(
      user.password,
      '123456',
    );

    expect(user).toBeInstanceOf(User);
    expect(user).toHaveProperty('id');
    expect(checkHash).toEqual(true);
  });

  it('should not create a user if the provided CPF is already being used', async () => {
    await createUserService.execute({
      cpf: '06516661120',
      email: 'johndoe@gmail.com',
      password: '123456',
      fullname: 'John Doe',
      phone: '61999999999',
      role: 0,
    });

    await expect(
      createUserService.execute({
        cpf: '06516661120',
        email: 'johntre@gmail.com',
        password: '123456',
        fullname: 'John Tre',
        phone: '61888888888',
        role: 0,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not create a user if the provided CPF is invalid', async () => {
    await expect(
      createUserService.execute({
        cpf: '12345678910',
        email: 'johndoe@gmail.com',
        password: '123456',
        fullname: 'John Doe',
        phone: '61888888888',
        role: 0,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not create a user if the provided E-mail is already being used', async () => {
    await createUserService.execute({
      cpf: '55890668161',
      email: 'johndoe@gmail.com',
      password: '123456',
      fullname: 'John Doe',
      phone: '61999999999',
      role: 0,
    });

    await expect(
      createUserService.execute({
        cpf: '06516661120',
        email: 'johndoe@gmail.com',
        password: '123456',
        fullname: 'John Tre',
        phone: '61888888888',
        role: 0,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
