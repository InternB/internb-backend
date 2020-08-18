import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import User from '../infra/typeorm/entities/User';

let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeUserRepository: FakeUserRepository;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

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

describe('ForgotPassword', () => {
  beforeEach(() => {
    fakeMailProvider = new FakeMailProvider();
    fakeUserRepository = new FakeUserRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeUserTokensRepository,
      fakeMailProvider,
    );
  });

  it('should be able to recover the password using the e-mail', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const user = createUser();

    const { email } = await fakeUserRepository.create(user);

    await sendForgotPasswordEmailService.execute({ email });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover the password if the user does not exist', async () => {
    await expect(
      sendForgotPasswordEmailService.execute({ email: 'johndoe@gmail.com' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to recover the password if the user is inactive', async () => {
    const user = createUser(false);

    await fakeUserRepository.create(user);

    await expect(
      sendForgotPasswordEmailService.execute({ email: 'johndoe@gmail.com' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
