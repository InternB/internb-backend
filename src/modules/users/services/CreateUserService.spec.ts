import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';

import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeProfessorsRepository from '../repositories/fakes/FakeProfessorsRepository';
import FakePreceptorsRepository from '../repositories/fakes/FakePreceptorsRepository';
import FakeStudentsRepository from '../repositories/fakes/FakeStudentsRepository';

let createUserService: CreateUserService;
let fakeUsersRepository: FakeUsersRepository;
let fakeProfessorsRepository: FakeProfessorsRepository;
let fakePreceptorsRepository: FakePreceptorsRepository;
let fakeStudentsRepository: FakeStudentsRepository;
let fakeHashProvider: FakeHashProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeProfessorsRepository = new FakeProfessorsRepository();
    fakePreceptorsRepository = new FakePreceptorsRepository();
    fakeStudentsRepository = new FakeStudentsRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeProfessorsRepository,
      fakePreceptorsRepository,
      fakeStudentsRepository,
      fakeHashProvider,
    );
  });

  it('should create a new Admin user', async () => {
    const user = await createUserService.execute({
      cpf: '06516661120',
      email: 'johndoe@gmail.com',
      password: '123456',
      fullname: 'John Doe',
      phone: '61999999999',
      role: 0,
    });

    expect(user).toBeInstanceOf(User);
    expect(user).toHaveProperty('id');
  });

  it('should create a new Professor user', async () => {
    const user = await createUserService.execute({
      cpf: '06516661120',
      email: 'johndoe@gmail.com',
      password: '123456',
      fullname: 'John Doe',
      phone: '61999999999',
      role: 1,
    });

    expect(user).toBeInstanceOf(User);
    expect(user).toHaveProperty('id');
  });

  it('should create a new Preceptor user', async () => {
    const user = await createUserService.execute({
      cpf: '06516661120',
      email: 'johndoe@gmail.com',
      password: '123456',
      fullname: 'John Doe',
      phone: '61999999999',
      role: 2,
    });

    expect(user).toBeInstanceOf(User);
    expect(user).toHaveProperty('id');
  });

  it('should create a new Student user', async () => {
    const user = await createUserService.execute({
      cpf: '06516661120',
      email: 'johndoe@gmail.com',
      password: '123456',
      fullname: 'John Doe',
      phone: '61999999999',
      role: 3,
    });

    expect(user).toBeInstanceOf(User);
    expect(user).toHaveProperty('id');
  });

  it('should not create a user if the provided CPF is already being used', async () => {
    await createUserService.execute({
      cpf: '06516661120',
      email: 'johndoe@gmail.com',
      password: '123456',
      fullname: 'John Doe',
      phone: '61999999999',
      role: Math.floor(Math.random() * 3),
    });

    await expect(
      createUserService.execute({
        cpf: '06516661120',
        email: 'johntre@gmail.com',
        password: '123456',
        fullname: 'John Tre',
        phone: '61888888888',
        role: Math.floor(Math.random() * 3),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not create a user if the provided CPF is invalid', async () => {
    await expect(
      createUserService.execute({
        cpf: '12345678910',
        email: 'johndoe@gmail.com',
        password: '123456',
        fullname: 'John Doe',
        phone: '61888888888',
        role: Math.floor(Math.random() * 3),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not create a user if the provided E-mail is already being used', async () => {
    await createUserService.execute({
      cpf: '55890668161',
      email: 'johndoe@gmail.com',
      password: '123456',
      fullname: 'John Doe',
      phone: '61999999999',
      role: Math.floor(Math.random() * 3),
    });

    await expect(
      createUserService.execute({
        cpf: '06516661120',
        email: 'johndoe@gmail.com',
        password: '123456',
        fullname: 'John Tre',
        phone: '61888888888',
        role: Math.floor(Math.random() * 3),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
