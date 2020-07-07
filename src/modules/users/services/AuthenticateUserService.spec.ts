import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUserService: AuthenticateUserService;

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
    const randomRole = Math.floor(Math.random() * 4);

    await fakeUsersRepository.create({
      cpf: '06516661120',
      email: 'johndoe@gmail.com',
      password: '123456',
      fullname: 'John Doe',
      phone: '61999999999',
      role: randomRole,
      active: true,
    });

    const auth = await authenticateUserService.execute({
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    expect(auth).toEqual(
      expect.objectContaining({
        user: expect.objectContaining({
          cpf: '06516661120',
          email: 'johndoe@gmail.com',
          fullname: 'John Doe',
          phone: '61999999999',
          role: randomRole,
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
    await fakeUsersRepository.create({
      cpf: '06516661120',
      email: 'johndoe@gmail.com',
      password: '123456',
      fullname: 'John Doe',
      phone: '61999999999',
      role: Math.floor(Math.random() * 4),
      active: true,
    });

    await expect(
      authenticateUserService.execute({
        email: 'johndoe@gmail.com',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not authenticate if user is not active', async () => {
    await fakeUsersRepository.create({
      cpf: '06516661120',
      email: 'johndoe@gmail.com',
      password: '123456',
      fullname: 'John Doe',
      phone: '61999999999',
      role: Math.floor(Math.random() * 3),
      active: false,
    });

    await expect(
      authenticateUserService.execute({
        email: 'johndoe@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
