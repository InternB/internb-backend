import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeUserRepository: FakeUserRepository;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

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

    const user = await fakeUserRepository.create({
      cpf: '06516661120',
      email: 'johndoe@gmail.com',
      password: '123456',
      fullname: 'John Doe',
      phone: '61999999999',
      role: 0,
    });

    await sendForgotPasswordEmailService.execute({ email: user.email });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover the password if the user does not exist', async () => {
    await expect(
      sendForgotPasswordEmailService.execute({ email: 'johndoe@gmail.com' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
