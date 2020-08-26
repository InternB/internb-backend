import 'reflect-metadata';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateClassService from './CreateClassService';
import FakeClassesRepository from '../repositories/fakes/FakeClassesRepository';
import FakeDisciplinesRepository from '../repositories/fakes/FakeDisciplinesRepository';

let fakeClassesRepository: FakeClassesRepository;
let fakeDisciplinesRepository: FakeDisciplinesRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createClassService: CreateClassService;

function createProfessor(active = true): User {
  const professor = new User();
  Object.assign(professor, {
    cpf: '29676193020',
    email: 'johndoe@gmail.com',
    password: '123456',
    fullname: 'John Doe',
    phone: '61999999999',
    role: 1,
    active,
  });

  return professor;
}

describe('CreateClass', () => {
  beforeEach(() => {
    fakeClassesRepository = new FakeClassesRepository();
    fakeDisciplinesRepository = new FakeDisciplinesRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createClassService = new CreateClassService(
      fakeClassesRepository,
      fakeDisciplinesRepository,
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should create a new class of a discipline', async () => {
    const enrolled = Math.floor(Math.random() * 40 + 1);

    const { id: discipline_id } = await fakeDisciplinesRepository.create({
      id: 'CIC0123',
      name: 'Estágio 1',
    });

    const professor = createProfessor();

    const { id: professor_id } = await fakeUsersRepository.create(professor);

    const createdClass = await createClassService.execute({
      id: 'A',
      semester: '2/2020',
      password: '123456',
      total_students_enrolled: enrolled,
      discipline_id,
      professor_id,
    });

    expect(createdClass).toEqual(
      expect.objectContaining({
        id: 'A',
        semester: '2/2020',
        total_students_enrolled: enrolled,
        total_students_registered: 0,
        discipline_id,
        professor_id,
      }),
    );
  });

  it('should not create a new class if discipline does not exist', async () => {
    const enrolled = Math.floor(Math.random() * 40 + 1);

    await expect(
      createClassService.execute({
        id: 'A',
        semester: '2/2020',
        password: '123456',
        total_students_enrolled: enrolled,
        discipline_id: 'CIC0123',
        professor_id: 'professor-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not create a new class if professor does not exist', async () => {
    const enrolled = Math.floor(Math.random() * 40 + 1);

    await fakeDisciplinesRepository.create({
      id: 'CIC0123',
      name: 'Estágio 1',
    });

    await expect(
      createClassService.execute({
        id: 'A',
        semester: '2/2020',
        password: '123456',
        total_students_enrolled: enrolled,
        discipline_id: 'CIC0123',
        professor_id: 'professor-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not create a new class if already exists', async () => {
    const enrolled = Math.floor(Math.random() * 40 + 1);

    const { id: discipline_id } = await fakeDisciplinesRepository.create({
      id: 'CIC0123',
      name: 'Estágio 1',
    });

    const professor = createProfessor();

    const { id: professor_id } = await fakeUsersRepository.create(professor);

    await fakeClassesRepository.create({
      id: 'A',
      semester: '2/2020',
      password: '123456',
      discipline_id,
      professor_id,
      total_students_enrolled: enrolled,
    });

    await expect(
      createClassService.execute({
        id: 'A',
        semester: '2/2020',
        password: '123456',
        total_students_enrolled: enrolled,
        discipline_id,
        professor_id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
