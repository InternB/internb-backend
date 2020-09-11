import 'reflect-metadata';

import FakePreceptorsRepository from '@modules/users/repositories/fakes/FakePreceptorsRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import School from '@modules/schools/infra/typeorm/entities/School';
import AppError from '@shared/errors/AppError';
import ListPreceptorInternshipsService from './ListPreceptorInternshipsService';
import IInternshipsRepository from '../repositories/IInternshipsRepository';
import FakeInternshipsRepository from '../repositories/fakes/FakeInternshipsRepository';

let fakePreceptorsRepository: FakePreceptorsRepository;
let fakeInternshipsRepository: IInternshipsRepository;
let listPreceptorInternshipsService: ListPreceptorInternshipsService;

describe('ListPreceptorInternships', () => {
  beforeEach(() => {
    fakePreceptorsRepository = new FakePreceptorsRepository();
    fakeInternshipsRepository = new FakeInternshipsRepository();
    listPreceptorInternshipsService = new ListPreceptorInternshipsService(
      fakePreceptorsRepository,
      fakeInternshipsRepository,
    );
  });

  it('should list all the internships mentored by a specific preceptor', async () => {
    const { id, user_id } = await fakePreceptorsRepository.createUserOfType({
      user_id: 'user-id',
      experience: 1,
      formation: 'nível de formação',
      user: new User(),
      school: new School(),
      school_id: 'school-id',
      internships: [],
    });

    let internship = await fakeInternshipsRepository.create({
      student_id: 'student-id-1',
      class_id: 'class-id',
      class_discipline_id: 'discipline-id',
      class_professor_id: 'professor-id',
    });
    internship.preceptor_id = id;
    await fakeInternshipsRepository.save(internship);

    internship = await fakeInternshipsRepository.create({
      student_id: 'student-id-2',
      class_id: 'class-id',
      class_discipline_id: 'discipline-id',
      class_professor_id: 'professor-id',
    });
    internship.preceptor_id = id;
    await fakeInternshipsRepository.save(internship);

    const response = await listPreceptorInternshipsService.execute({ user_id });

    expect(response).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          student_id: 'student-id-1',
        }),
        expect.objectContaining({
          student_id: 'student-id-2',
        }),
      ]),
    );
  });

  it('should not list internships if preceptor does not exist', async () => {
    await expect(
      listPreceptorInternshipsService.execute({
        user_id: 'invalid-preceptor-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
