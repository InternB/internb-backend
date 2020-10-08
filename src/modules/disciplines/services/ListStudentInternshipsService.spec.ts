import 'reflect-metadata';

import FakeStudentsRepository from '@modules/users/repositories/fakes/FakeStudentsRepository';
import { v4 } from 'uuid';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import ListStudentInternshipsService from './ListStudentInternshipsService';
import FakeInternshipsRepository from '../repositories/fakes/FakeInternshipsRepository';

let fakeStudentsRepository: FakeStudentsRepository;
let fakeInternshipsRepository: FakeInternshipsRepository;
let listStudentInternshipsService: ListStudentInternshipsService;

describe('ListStudentInternships', () => {
  beforeEach(() => {
    fakeStudentsRepository = new FakeStudentsRepository();
    fakeInternshipsRepository = new FakeInternshipsRepository();

    listStudentInternshipsService = new ListStudentInternshipsService(
      fakeStudentsRepository,
      fakeInternshipsRepository,
    );
  });

  it('should list all the internships of a given student', async () => {
    const { id: student_id } = await fakeStudentsRepository.createUserOfType({
      id: '',
      enrollment: '999999999',
      semester: '2/2020',
      user_id: 'user-id',
      internships: [],
      user: new User(),
    });

    await fakeInternshipsRepository.create({
      student_id,
      class_id: 'class-id',
      class_discipline_id: 'class-discipline-id',
      class_professor_id: 'class-professor-id',
    });

    await fakeInternshipsRepository.create({
      student_id,
      class_id: 'class-id',
      class_discipline_id: 'class-discipline-id',
      class_professor_id: 'class-professor-id',
    });

    const internships = await listStudentInternshipsService.execute({
      user_id: 'user-id',
    });

    expect(internships).not.toBeNull();
    expect(internships.length).toEqual(2);
  });

  it("should return an empty array if student doesn't have any internships", async () => {
    await fakeStudentsRepository.createUserOfType({
      id: v4(),
      enrollment: '999999999',
      semester: '2/2020',
      user_id: 'user-id',
      internships: [],
      user: new User(),
    });

    const internships = await listStudentInternshipsService.execute({
      user_id: 'user-id',
    });

    expect(internships).not.toBeNull();
    expect(internships.length).toEqual(0);
  });

  it("should not list internships if student doesn't exist", async () => {
    await expect(
      listStudentInternshipsService.execute({
        user_id: 'invalid-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
