import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/model/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

import IMailTemplateProvider from './MailTemplateProvider/model/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

import IMailProvider from './MailProvider/model/IMailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve<IMailProvider>(EtherealMailProvider),
);
