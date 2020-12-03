import 'reflect-metadata';
import { v4 } from 'uuid';

import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import Professor from '@modules/users/infra/typeorm/entities/Professor';
import User from '@modules/users/infra/typeorm/entities/User';
import CreateClassService from './CreateClassService';
import FakeClassesRepository from '../repositories/fakes/FakeClassesRepository';
import FakeDisciplinesRepository from '../repositories/fakes/FakeDisciplinesRepository';
import FakeProfessorsRepository from '../../users/repositories/fakes/FakeProfessorsRepository';

let fakeClassesRepository: FakeClassesRepository;
let fakeDisciplinesRepository: FakeDisciplinesRepository;
let fakeProfessorsRepository: FakeProfessorsRepository;
let fakeHashProvider: FakeHashProvider;
let createClassService: CreateClassService;

function createProfessor(): Professor {
  const professor = new Professor();
  Object.assign(professor, {
    id: v4(),
    user_id: v4(),
    user: new User(),
    internships: [],
  });

  return professor;
}

describe('CreateClass', () => {
  beforeEach(() => {
    fakeClassesRepository = new FakeClassesRepository();
    fakeDisciplinesRepository = new FakeDisciplinesRepository();
    fakeProfessorsRepository = new FakeProfessorsRepository();
    fakeHashProvider = new FakeHashProvider();
    createClassService = new CreateClassService(
      fakeClassesRepository,
      fakeDisciplinesRepository,
      fakeProfessorsRepository,
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

    const { user_id, id } = await fakeProfessorsRepository.createUserOfType(
      professor,
    );

    const createdClass = await createClassService.execute({
      sign: 'A',
      semester: '2/2020',
      password: '123456',
      total_students_enrolled: enrolled,
      discipline_id,
      user_id,
    });

    expect(createdClass).toEqual(
      expect.objectContaining({
        sign: 'A',
        semester: '2/2020',
        total_students_enrolled: enrolled,
        total_students_registered: 0,
        discipline_id,
        professor_id: id,
      }),
    );
  });

  it('should not create a new class if discipline does not exist', async () => {
    const enrolled = Math.floor(Math.random() * 40 + 1);

    await expect(
      createClassService.execute({
        sign: 'A',
        semester: '2/2020',
        password: '123456',
        total_students_enrolled: enrolled,
        discipline_id: 'CIC0123',
        user_id: 'professor-id',
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
        sign: 'A',
        semester: '2/2020',
        password: '123456',
        total_students_enrolled: enrolled,
        discipline_id: 'CIC0123',
        user_id: 'professor-id',
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

    const {
      user_id,
      id: professor_id,
    } = await fakeProfessorsRepository.createUserOfType(professor);

    await fakeClassesRepository.create({
      sign: 'A',
      semester: '2/2020',
      password: '123456',
      discipline_id,
      professor_id,
      total_students_enrolled: enrolled,
    });

    await expect(
      createClassService.execute({
        sign: 'A',
        semester: '2/2020',
        password: '123456',
        total_students_enrolled: enrolled,
        discipline_id,
        user_id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
