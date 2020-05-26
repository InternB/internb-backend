import { container } from 'tsyringe';

import IMailProvider from './MailProvider/model/IMailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve<IMailProvider>(EtherealMailProvider),
);
