import { container } from 'tsyringe';

import '@shared/container/providers';
import '@modules/users/providers';

import Professor from '@modules/users/infra/typeorm/entities/Professor';
import Preceptor from '@modules/users/infra/typeorm/entities/Preceptor';
import Student from '@modules/users/infra/typeorm/entities/Student';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IGenericUsersRepository from '@modules/users/repositories/IGenericUsersRepository';
import ProfessorsRepository from '@modules/users/infra/typeorm/repositories/ProfessorsRepository';
import PreceptorsRepository from '@modules/users/infra/typeorm/repositories/PreceptorsRepository';
import StudentsRepository from '@modules/users/infra/typeorm/repositories/StudentsRepository';

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

import IClassesRepository from '@modules/disciplines/repositories/IClassesRepository';
import ClassesRepository from '@modules/disciplines/infra/typeorm/repositories/ClassesRepository';

import IInternshipsRepository from '@modules/disciplines/repositories/IInternshipsRepository';
import InternshipsRepository from '@modules/disciplines/infra/typeorm/repositories/InternshipsRepository';

import IAssessmentsRepository from '@modules/disciplines/repositories/IAssessmentsRepository';
import AssessmentsRepository from '@modules/disciplines/infra/typeorm/repositories/AssessmentsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IGenericUsersRepository<Professor>>(
  'ProfessorsRepository',
  ProfessorsRepository,
);

container.registerSingleton<IGenericUsersRepository<Preceptor>>(
  'PreceptorsRepository',
  PreceptorsRepository,
);

container.registerSingleton<IGenericUsersRepository<Student>>(
  'StudentsRepository',
  StudentsRepository,
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

container.registerSingleton<IClassesRepository>(
  'ClassesRepository',
  ClassesRepository,
);

container.registerSingleton<IInternshipsRepository>(
  'InternshipsRepository',
  InternshipsRepository,
);

container.registerSingleton<IAssessmentsRepository>(
  'AssessmentsRepository',
  AssessmentsRepository,
);
