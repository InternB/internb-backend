/* eslint-disable no-await-in-loop */
import 'reflect-metadata';

import FakeSchoolsRepository from '@modules/schools/repositories/fakes/FakeSchoolsRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import FakePreceptorsRepository from '@modules/users/repositories/fakes/FakePreceptorsRepository';
import FakeStudentsRepository from '@modules/users/repositories/fakes/FakeStudentsRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import Student from '@modules/users/infra/typeorm/entities/Student';
import FakeInternshipsRepository from '../repositories/fakes/FakeInternshipsRepository';
import StudentsSchoolsDataReportService from './StudentsSchoolsDataReportService';
import FakeClassesRepository from '../repositories/fakes/FakeClassesRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeStudentsRepository: FakeStudentsRepository;
let fakePreceptorsRepository: FakePreceptorsRepository;
let fakeSchoolsRepository: FakeSchoolsRepository;
let fakeClassesRepository: FakeClassesRepository;
let fakeInternshipsRepository: FakeInternshipsRepository;
let studentsSchoolsDataReportService: StudentsSchoolsDataReportService;

describe('StudentsSchoolsDataReport', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStudentsRepository = new FakeStudentsRepository();
    fakePreceptorsRepository = new FakePreceptorsRepository();
    fakeSchoolsRepository = new FakeSchoolsRepository();
    fakeClassesRepository = new FakeClassesRepository();
    fakeInternshipsRepository = new FakeInternshipsRepository();
    studentsSchoolsDataReportService = new StudentsSchoolsDataReportService(
      fakeInternshipsRepository,
    );
  });

  it('should return the Students Schools Data Report', async () => {
    for (let i = 0; i < 2; i += 1) {
      const user = new User();
      Object.assign(user, {
        role: 3,
        active: true,
        cpf: `user-cpf${i}`,
        email: `johndoe${i}@example.com`,
        password: '123456',
        fullname: `John Doe${i}`,
        phone: '6199999999',
        avatar: 'default.png',
        created_at: new Date(),
        updated_at: new Date(),
      });
      const { id: user_id } = await fakeUsersRepository.create(user);

      let student = new Student();
      Object.assign(student, {
        user,
        user_id,
        enrollment: `Matricula${i}`,
        semester: '2/2020',
      });
      student = await fakeStudentsRepository.createUserOfType(student);

      const internship = await fakeInternshipsRepository.create({
        student_id: student.id,
        class_id: 'class-id',
        class_professor_id: 'professor-id',
        class_discipline_id: 'class-discipline-id',
      });
      internship.student = student;

      const intern_class = await fakeClassesRepository.create({
        discipline_id: 'discipline-id',
        professor_id: 'professor-id',
        password: '123456',
        semester: '2/2020',
        sign: 'A',
        total_students_enrolled: 40,
      });

      const school = await fakeSchoolsRepository.create({
        address: `school${i}-address`,
        adm_region_id: `adm-region-id${i}`,
        cep: `school-cep${i}`,
        name: `school-name${i}`,
      });

      const preceptor_user = new User();
      Object.assign(preceptor_user, {
        role: 2,
        active: true,
        cpf: `preceptor-cpf${i}`,
        email: `preceptordoe${i}@example.com`,
        password: '123456',
        fullname: `Preceptor Doe${i}`,
        phone: '6199999999',
        avatar: 'default.png',
        created_at: new Date(),
        updated_at: new Date(),
      });
      await fakeUsersRepository.create(preceptor_user);

      const preceptor = await fakePreceptorsRepository.createUserOfType({
        user: preceptor_user,
        user_id: preceptor_user.id,
        school,
        school_id: school.id,
        experience: i,
        formation: `preceptor${i}-formation`,
        internships: [],
      });

      internship.class = intern_class;
      internship.school = school;
      internship.preceptor = preceptor;
      await fakeInternshipsRepository.save(internship);
    }

    const response = await studentsSchoolsDataReportService.execute({
      professor_id: 'professor-id',
    });

    expect(response).toEqual(
      expect.objectContaining({
        'class-discipline-id': expect.objectContaining({
          A: expect.arrayContaining([expect.any(Object), expect.any(Object)]),
        }),
      }),
    );
  });

  it('should not return the Students Schools Data Report if professor does not exist', async () => {
    const response = await studentsSchoolsDataReportService.execute({
      professor_id: 'invalid-professor',
    });

    expect(response).toEqual(expect.arrayContaining([]));
  });
});
