import path from 'path';
import { inject, injectable } from 'tsyringe';

import IMailProvider from '@shared/container/providers/MailProvider/model/IMailProvider';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
  email: string;
}

@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError('User does not exist', 400);

    if (!user.active)
      throw new AppError("Can't recover the password of inactive user");

    const { token } = await this.userTokensRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.fullname,
        address: user.email,
      },
      subject: 'Recuperação de Senha',
      templateDate: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.fullname,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
        },
      },
    });
  }
}
