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

import ISchoolsRepository from '@modules/schools/repositories/ISchoolsRepository';
import SchoolsRepository from '@modules/schools/infra/typeorm/repositories/SchoolsRepository';

import ISchoolManagersRepository from '@modules/schools/repositories/ISchoolManagersRepository';
import SchoolManagersRepository from '@modules/schools/infra/typeorm/repositories/SchoolManagersRepository';

import IDisciplinesRepository from '@modules/disciplines/repositories/IDisciplinesRepository';
import DisciplinesRepository from '@modules/disciplines/infra/typeorm/repositories/DisciplinesRepository';

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

container.registerSingleton<ISchoolsRepository>(
  'SchoolsRepository',
  SchoolsRepository,
);

container.registerSingleton<ISchoolManagersRepository>(
  'SchoolManagersRepository',
  SchoolManagersRepository,
);

container.registerSingleton<IDisciplinesRepository>(
  'DisciplinesRepository',
  DisciplinesRepository,
);
