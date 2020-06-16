import { container } from 'tsyringe';

import '@shared/container/providers';
import '@modules/users/providers';
// import '@modules/schools/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IAdmRegionsRepository from '@modules/schools/repositories/IAdmRegionsRepository';
import AdmRegionsRepository from '@modules/schools/infra/typeorm/repositories/AdmRegionsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IAdmRegionsRepository>(
  'AdmRegionsRepository',
  AdmRegionsRepository,
);
