import nodemailer, { Transporter } from 'nodemailer';

import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '../model/IMailProvider';

export default class EtherealMailProvider implements IMailProvider {
  private ethereal: Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then(account => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        console.log('Testing account created');

        this.ethereal = transporter;
      })
      .catch(() => {
        console.log('Failed to create testing account...');
        return process.exit(1);
      });
  }

  public async sendMail({
    to,
    from,
    subject,
    content,
  }: ISendMailDTO): Promise<void> {
    const message = await this.ethereal.sendMail({
      from: {
        name: from?.name || 'Equipe InternB',
        address: from?.address || 'contato@internb.unb.br',
      },
      to: {
        name: to.name,
        address: to.address,
      },
      subject,
      html: content,
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
