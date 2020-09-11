import 'reflect-metadata';

import FakePreceptorsRepository from '@modules/users/repositories/fakes/FakePreceptorsRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import School from '@modules/schools/infra/typeorm/entities/School';
import AppError from '@shared/errors/AppError';
import FakeInternshipsRepository from '../repositories/fakes/FakeInternshipsRepository';
import RegisterInternToPreceptorService from './RegisterInternToPreceptorService';

let fakePreceptorsRepository: FakePreceptorsRepository;
let fakeInternshipsRepository: FakeInternshipsRepository;
let registerInternToPreceptorService: RegisterInternToPreceptorService;

describe('RegisterInternToPreceptor', () => {
  beforeEach(() => {
    fakePreceptorsRepository = new FakePreceptorsRepository();
    fakeInternshipsRepository = new FakeInternshipsRepository();
    registerInternToPreceptorService = new RegisterInternToPreceptorService(
      fakePreceptorsRepository,
      fakeInternshipsRepository,
    );
  });

  it("should register intern to a preceptor of intern's registered school", async () => {
    const internship = await fakeInternshipsRepository.create({
      student_id: 'student-id',
      class_id: 'class-id',
      class_discipline_id: 'discipline-id',
      class_professor_id: 'professor-id',
    });
    internship.school_id = 'school-id';
    await fakeInternshipsRepository.save(internship);
    const { id: internship_id } = internship;

    const {
      id: preceptor_id,
    } = await fakePreceptorsRepository.createUserOfType({
      user_id: 'user-id',
      experience: 1,
      formation: 'nível de formação',
      school_id: 'school-id',
      user: new User(),
      school: new School(),
      internships: [],
    });

    const response = await registerInternToPreceptorService.execute({
      internship_id,
      preceptor_id,
    });

    expect(response).toEqual(
      expect.objectContaining({
        preceptor_id,
      }),
    );
  });

  it('should not register intern if internship does not exist', async () => {
    await expect(
      registerInternToPreceptorService.execute({
        internship_id: 'invalid-internship-id',
        preceptor_id: 'preceptor-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not register intern to preceptor if intern is not registered to a school', async () => {
    const { id: internship_id } = await fakeInternshipsRepository.create({
      student_id: 'student-id',
      class_id: 'class-id',
      class_discipline_id: 'discipline-id',
      class_professor_id: 'professor-id',
    });

    await expect(
      registerInternToPreceptorService.execute({
        internship_id,
        preceptor_id: 'invalid-preceptor-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not register intern if preceptor does not exist', async () => {
    const internship = await fakeInternshipsRepository.create({
      student_id: 'student-id',
      class_id: 'class-id',
      class_discipline_id: 'discipline-id',
      class_professor_id: 'professor-id',
    });
    internship.school_id = 'school-id';
    await fakeInternshipsRepository.save(internship);
    const { id: internship_id } = internship;

    await expect(
      registerInternToPreceptorService.execute({
        internship_id,
        preceptor_id: 'invalid-preceptor-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not register intern to preceptor if preceptor does not work on intern's school", async () => {
    const internship = await fakeInternshipsRepository.create({
      student_id: 'student-id',
      class_id: 'class-id',
      class_discipline_id: 'discipline-id',
      class_professor_id: 'professor-id',
    });
    internship.school_id = 'school-id';
    await fakeInternshipsRepository.save(internship);
    const { id: internship_id } = internship;

    const {
      id: preceptor_id,
    } = await fakePreceptorsRepository.createUserOfType({
      user_id: 'user-id',
      experience: 1,
      formation: 'nível de formação',
      school_id: 'any-other-school-id',
      user: new User(),
      school: new School(),
      internships: [],
    });

    await expect(
      registerInternToPreceptorService.execute({
        internship_id,
        preceptor_id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
