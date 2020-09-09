import 'reflect-metadata';
import { v4 } from 'uuid';

import AppError from '@shared/errors/AppError';
import FakeSchoolsRepository from '@modules/schools/repositories/fakes/FakeSchoolsRepository';
import FakeInternshipsRepository from '@modules/disciplines/repositories/fakes/FakeInternshipsRepository';
import FakeStudentsRepository from '@modules/users/repositories/fakes/FakeStudentsRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import RegisterInternToSchool from './RegisterInternToSchoolService';

let studentsRepository: FakeStudentsRepository;
let schoolsRepository: FakeSchoolsRepository;
let internshipsRepository: FakeInternshipsRepository;
let registerInternToSchool: RegisterInternToSchool;

describe('RegisterInternToSchool', () => {
  beforeEach(() => {
    studentsRepository = new FakeStudentsRepository();
    schoolsRepository = new FakeSchoolsRepository();
    internshipsRepository = new FakeInternshipsRepository();

    registerInternToSchool = new RegisterInternToSchool(
      studentsRepository,
      schoolsRepository,
      internshipsRepository,
    );
  });

  it('should be able to register intern to a specific school', async () => {
    const user_id = 'user-id';

    const { id: student_id } = await studentsRepository.createUserOfType({
      id: v4(),
      user_id,
      enrollment: '999999999',
      semester: '2/2020',
      internships: [],
      user: new User(),
    });

    const { id: internship_id } = await internshipsRepository.create({
      student_id,
      class_id: 'class-id',
      class_discipline_id: 'class-discipline-id',
      class_professor_id: 'class-professor-id',
    });

    const { id: school_id } = await schoolsRepository.create({
      cep: '00000000',
      name: 'school name',
      address: 'school-address',
      email: 'school@example.com',
      phone: '6199999999',
      adm_region_id: 'adm-region-id',
    });

    const internship = await registerInternToSchool.execute({
      internship_id,
      user_id,
      school_id,
    });

    expect(internship).toEqual(
      expect.objectContaining({
        school_id,
      }),
    );
  });

  it('should not be abtle to register intern if he/she is already register to a school', async () => {
    const user_id = 'user-id';

    const { id: student_id } = await studentsRepository.createUserOfType({
      id: v4(),
      user_id,
      enrollment: '999999999',
      semester: '2/2020',
      internships: [],
      user: new User(),
    });

    const internship = await internshipsRepository.create({
      student_id,
      class_id: 'class-id',
      class_discipline_id: 'class-discipline-id',
      class_professor_id: 'class-professor-id',
    });
    internship.school_id = 'school_id';
    await internshipsRepository.save(internship);
    const { id: internship_id } = internship;

    const { id: school_id } = await schoolsRepository.create({
      cep: '00000000',
      name: 'school name',
      address: 'school-address',
      email: 'school@example.com',
      phone: '6199999999',
      adm_region_id: 'adm-region-id',
    });

    await expect(
      registerInternToSchool.execute({
        internship_id,
        user_id,
        school_id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to register intern if he/she does not exist', async () => {
    const { id: school_id } = await schoolsRepository.create({
      cep: '00000000',
      name: 'school name',
      address: 'school-address',
      email: 'school@example.com',
      phone: '6199999999',
      adm_region_id: 'adm-region-id',
    });

    await expect(
      registerInternToSchool.execute({
        internship_id: 'any-internship-id',
        user_id: 'invalid-user',
        school_id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to register intern if internship does not exist', async () => {
    const user_id = 'user-id';

    await studentsRepository.createUserOfType({
      id: v4(),
      user_id,
      enrollment: '999999999',
      semester: '2/2020',
      internships: [],
      user: new User(),
    });

    const { id: school_id } = await schoolsRepository.create({
      cep: '00000000',
      name: 'school name',
      address: 'school-address',
      email: 'school@example.com',
      phone: '6199999999',
      adm_region_id: 'adm-region-id',
    });

    await expect(
      registerInternToSchool.execute({
        internship_id: 'invalid-internship',
        user_id,
        school_id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to register intern to school if it does not exist', async () => {
    const user_id = 'user-id';

    const { id: student_id } = await studentsRepository.createUserOfType({
      id: v4(),
      user_id,
      enrollment: '999999999',
      semester: '2/2020',
      internships: [],
      user: new User(),
    });

    const { id: internship_id } = await internshipsRepository.create({
      student_id,
      class_id: 'class-id',
      class_discipline_id: 'class-discipline-id',
      class_professor_id: 'class-professor-id',
    });

    await expect(
      registerInternToSchool.execute({
        internship_id,
        user_id,
        school_id: 'invalid-school',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
