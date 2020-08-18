import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import ResetPasswordService from './ResetPasswordService';
import User from '../infra/typeorm/entities/User';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPasswordService: ResetPasswordService;

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

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset the password', async () => {
    const generateHash = jest.spyOn(fakeHashProvider, 'generate');

    const user = createUser();

    const { id } = await fakeUsersRepository.create(user);

    const { token } = await fakeUserTokensRepository.generate(id);

    await resetPasswordService.execute({ token, password: 'new-password' });

    const updatedUser = await fakeUsersRepository.findByEmail(user.email);

    expect(generateHash).toHaveBeenCalledWith('new-password', 8);

    if (updatedUser) expect(updatedUser.password).toBe('new-password');
  });

  it('should not be able to reset the password with a non-existing token', async () => {
    await expect(
      resetPasswordService.execute({
        token: 'non-existing-token',
        password: 'any-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password if the user does not exist', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'non-existing-user-id',
    );

    await expect(
      resetPasswordService.execute({
        token,
        password: 'any-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password if more than 2 hours have passed since token creation', async () => {
    const user = createUser();

    const { id } = await fakeUsersRepository.create(user);

    const { token } = await fakeUserTokensRepository.generate(id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({
        token,
        password: 'any-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
