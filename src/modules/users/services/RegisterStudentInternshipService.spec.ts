import 'reflect-metadata';

import { v4 } from 'uuid';
import AppError from '@shared/errors/AppError';
import RegisterStudentInternshipService from './RegisterStudentInternshipService';
import FakeStudentsRepository from '../repositories/fakes/FakeStudentsRepository';
import FakeClassesRepository from '../../disciplines/repositories/fakes/FakeClassesRepository';
import FakeInternshipsRepository from '../../disciplines/repositories/fakes/FakeInternshipsRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import User from '../infra/typeorm/entities/User';

let fakeStudentsRepository: FakeStudentsRepository;
let fakeClassesRepository: FakeClassesRepository;
let fakeIntershipsRepository: FakeInternshipsRepository;
let fakeHashProvider: FakeHashProvider;
let registerStudentInternshipService: RegisterStudentInternshipService;

describe('RegisterStudentInternship', () => {
  beforeEach(() => {
    fakeStudentsRepository = new FakeStudentsRepository();
    fakeClassesRepository = new FakeClassesRepository();
    fakeIntershipsRepository = new FakeInternshipsRepository();
    fakeHashProvider = new FakeHashProvider();
    registerStudentInternshipService = new RegisterStudentInternshipService(
      fakeStudentsRepository,
      fakeClassesRepository,
      fakeIntershipsRepository,
      fakeHashProvider,
    );
  });

  it('should be able to register student to internship class', async () => {
    const {
      id: class_id,
      professor_id: class_professor_id,
      discipline_id: class_discipline_id,
    } = await fakeClassesRepository.create({
      sign: 'A',
      professor_id: 'professor-id',
      discipline_id: 'CIC0123',
      total_students_enrolled: 40,
      password: '123456',
      semester: '2/2020',
    });

    const { id: student_id } = await fakeStudentsRepository.createUserOfType({
      id: v4(),
      user_id: 'user-id',
      semester: '2/2020',
      enrollment: '99/9999999',
      internships: [],
      user: new User(),
    });

    const internship = await registerStudentInternshipService.execute({
      student_id,
      class_id,
      password: '123456',
    });

    expect(internship).toEqual(
      expect.objectContaining({
        student_id,
        class_id,
        class_discipline_id,
        class_professor_id,
      }),
    );
  });

  it("should not be able to register student to internship if class doesn't exist", async () => {
    const { id: student_id } = await fakeStudentsRepository.createUserOfType({
      id: v4(),
      user_id: 'user-id',
      semester: '2/2020',
      enrollment: '99/9999999',
      internships: [],
      user: new User(),
    });

    await expect(
      registerStudentInternshipService.execute({
        student_id,
        class_id: 'invalid-class-id',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to register student to internship if he/she doesn't exist", async () => {
    const { id: class_id } = await fakeClassesRepository.create({
      sign: 'A',
      professor_id: 'professor-id',
      discipline_id: 'CIC0123',
      total_students_enrolled: 40,
      password: '123456',
      semester: '2/2020',
    });

    await expect(
      registerStudentInternshipService.execute({
        student_id: 'invalid-student-id',
        class_id,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to register student to internship if class password doesn't match", async () => {
    const { id: class_id } = await fakeClassesRepository.create({
      sign: 'A',
      professor_id: 'professor-id',
      discipline_id: 'CIC0123',
      total_students_enrolled: 40,
      password: '123456',
      semester: '2/2020',
    });

    const { id: student_id } = await fakeStudentsRepository.createUserOfType({
      id: v4(),
      user_id: 'user-id',
      semester: '2/2020',
      enrollment: '99/9999999',
      internships: [],
      user: new User(),
    });

    await expect(
      registerStudentInternshipService.execute({
        student_id,
        class_id,
        password: 'invalid-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to register student if class is already full', async () => {
    const { id: class_id } = await fakeClassesRepository.create({
      sign: 'A',
      professor_id: 'professor-id',
      discipline_id: 'CIC0123',
      total_students_enrolled: 40,
      password: '123456',
      semester: '2/2020',
    });

    const classById = await fakeClassesRepository.findById(class_id);
    if (classById) {
      classById.total_students_registered = 40;
      await fakeClassesRepository.save(classById);
    }

    const { id: student_id } = await fakeStudentsRepository.createUserOfType({
      id: v4(),
      user_id: 'user-id',
      semester: '2/2020',
      enrollment: '99/9999999',
      internships: [],
      user: new User(),
    });

    await expect(
      registerStudentInternshipService.execute({
        student_id,
        class_id,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
