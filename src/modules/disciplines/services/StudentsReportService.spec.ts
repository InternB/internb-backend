import 'reflect-metadata';

import FakeStudentsRepository from '@modules/users/repositories/fakes/FakeStudentsRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import Student from '@modules/users/infra/typeorm/entities/Student';
import FakeInternshipsRepository from '../repositories/fakes/FakeInternshipsRepository';
import FakeActivitiesRepository from '../repositories/fakes/FakeActivitiesRepository';
import FakeCalendarsRepository from '../repositories/fakes/FakeCalendarsRepository';
import FakeClassesRepository from '../repositories/fakes/FakeClassesRepository';

import StudentsReportService from './StudentsReportService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStudentsRepository: FakeStudentsRepository;
let fakeActivitiesRepository: FakeActivitiesRepository;
let fakeCalendarsRepository: FakeCalendarsRepository;
let fakeClassesRepository: FakeClassesRepository;
let fakeInternshipsRepository: FakeInternshipsRepository;
let studentsReportService: StudentsReportService;

describe('StudentsReport', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStudentsRepository = new FakeStudentsRepository();
    fakeActivitiesRepository = new FakeActivitiesRepository();
    fakeCalendarsRepository = new FakeCalendarsRepository();
    fakeClassesRepository = new FakeClassesRepository();

    fakeInternshipsRepository = new FakeInternshipsRepository();
    studentsReportService = new StudentsReportService(
      fakeInternshipsRepository,
    );
  });

  it('should return the Students Data Report (complete)', async () => {
    const user = new User();
    Object.assign(user, {
      role: 3,
      active: true,
      cpf: 'user-cpf',
      email: 'johndoe@example.com',
      password: '123456',
      fullname: 'John Doe',
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
      enrollment: 'matricula',
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
    internship.work_plan = 'work-plan';
    internship.assessment_id = 'assessment-id';

    const activity = await fakeActivitiesRepository.create({
      internship_id: internship.id,
      timestamp: new Date().getTime(),
      sign: 'Turma',
      description: 'Lorem ipsum',
      photo: 'photo.jpg',
    });

    const date = new Date();
    const calendar = await fakeCalendarsRepository.create({
      starts_at: [date, date, date, date, date],
      finishes_at: [date, date, date, date, date],
    });

    const intern_class = await fakeClassesRepository.create({
      discipline_id: 'discipline-id',
      professor_id: 'professor-id',
      password: '123456',
      semester: '2/2020',
      sign: 'A',
      total_students_enrolled: 40,
    });

    internship.activities = [activity];
    internship.calendar = calendar;
    internship.class = intern_class;
    await fakeInternshipsRepository.save(internship);

    const response = await studentsReportService.execute({
      professor_id: 'professor-id',
    });

    expect(response).toEqual(
      expect.objectContaining({
        'class-discipline-id': expect.objectContaining({
          A: expect.arrayContaining([
            expect.objectContaining({
              id: internship.id,
              student: expect.objectContaining({
                semester: '2/2020',
                enrollment: 'matricula',
                user_id,
                user: expect.objectContaining({
                  cpf: 'user-cpf',
                  email: 'johndoe@example.com',
                  fullname: 'John Doe',
                  phone: '6199999999',
                }),
              }),
              has_activities: true,
              activities: expect.arrayContaining([
                expect.objectContaining({
                  internship_id: internship.id,
                  sign: 'Turma',
                  description: 'Lorem ipsum',
                  photo: 'photo.jpg',
                }),
              ]),
              calendar: expect.objectContaining({
                starts_at: expect.arrayContaining([
                  date,
                  date,
                  date,
                  date,
                  date,
                ]),
                finishes_at: expect.arrayContaining([
                  date,
                  date,
                  date,
                  date,
                  date,
                ]),
              }),
              has_work_plan: true,
              work_plan: 'work-plan',
              assessment_id: 'assessment-id',
            }),
          ]),
        }),
      }),
    );
  });

  it('should return the Students Data Report (no activities)', async () => {
    const user = new User();
    Object.assign(user, {
      role: 3,
      active: true,
      cpf: 'user-cpf',
      email: 'johndoe@example.com',
      password: '123456',
      fullname: 'John Doe',
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
      enrollment: 'matricula',
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
    internship.work_plan = 'work-plan';
    internship.assessment_id = 'assessment-id';

    const date = new Date();
    const calendar = await fakeCalendarsRepository.create({
      starts_at: [date, date, date, date, date],
      finishes_at: [date, date, date, date, date],
    });

    const intern_class = await fakeClassesRepository.create({
      discipline_id: 'discipline-id',
      professor_id: 'professor-id',
      password: '123456',
      semester: '2/2020',
      sign: 'A',
      total_students_enrolled: 40,
    });

    internship.calendar = calendar;
    internship.class = intern_class;
    await fakeInternshipsRepository.save(internship);

    const response = await studentsReportService.execute({
      professor_id: 'professor-id',
    });

    expect(response).toEqual(
      expect.objectContaining({
        'class-discipline-id': expect.objectContaining({
          A: expect.arrayContaining([
            expect.objectContaining({
              id: internship.id,
              student: expect.objectContaining({
                semester: '2/2020',
                enrollment: 'matricula',
                user_id,
                user: expect.objectContaining({
                  cpf: 'user-cpf',
                  email: 'johndoe@example.com',
                  fullname: 'John Doe',
                  phone: '6199999999',
                }),
              }),
              has_activities: false,
              activities: expect.arrayContaining([]),
              calendar: expect.objectContaining({
                starts_at: expect.arrayContaining([
                  date,
                  date,
                  date,
                  date,
                  date,
                ]),
                finishes_at: expect.arrayContaining([
                  date,
                  date,
                  date,
                  date,
                  date,
                ]),
              }),
              has_work_plan: true,
              work_plan: 'work-plan',
              assessment_id: 'assessment-id',
            }),
          ]),
        }),
      }),
    );
  });

  it('should return the Students Data Report (no work plan)', async () => {
    const user = new User();
    Object.assign(user, {
      role: 3,
      active: true,
      cpf: 'user-cpf',
      email: 'johndoe@example.com',
      password: '123456',
      fullname: 'John Doe',
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
      enrollment: 'matricula',
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
    internship.assessment_id = 'assessment-id';

    const activity = await fakeActivitiesRepository.create({
      internship_id: internship.id,
      timestamp: new Date().getTime(),
      sign: 'Turma',
      description: 'Lorem ipsum',
      photo: 'photo.jpg',
    });

    const date = new Date();
    const calendar = await fakeCalendarsRepository.create({
      starts_at: [date, date, date, date, date],
      finishes_at: [date, date, date, date, date],
    });

    const intern_class = await fakeClassesRepository.create({
      discipline_id: 'discipline-id',
      professor_id: 'professor-id',
      password: '123456',
      semester: '2/2020',
      sign: 'A',
      total_students_enrolled: 40,
    });

    internship.activities = [activity];
    internship.calendar = calendar;
    internship.class = intern_class;
    await fakeInternshipsRepository.save(internship);

    const response = await studentsReportService.execute({
      professor_id: 'professor-id',
    });

    expect(response).toEqual(
      expect.objectContaining({
        'class-discipline-id': expect.objectContaining({
          A: expect.arrayContaining([
            expect.objectContaining({
              id: internship.id,
              student: expect.objectContaining({
                semester: '2/2020',
                enrollment: 'matricula',
                user_id,
                user: expect.objectContaining({
                  cpf: 'user-cpf',
                  email: 'johndoe@example.com',
                  fullname: 'John Doe',
                  phone: '6199999999',
                }),
              }),
              has_activities: true,
              activities: expect.arrayContaining([
                expect.objectContaining({
                  internship_id: internship.id,
                  sign: 'Turma',
                  description: 'Lorem ipsum',
                  photo: 'photo.jpg',
                }),
              ]),
              calendar: expect.objectContaining({
                starts_at: expect.arrayContaining([
                  date,
                  date,
                  date,
                  date,
                  date,
                ]),
                finishes_at: expect.arrayContaining([
                  date,
                  date,
                  date,
                  date,
                  date,
                ]),
              }),
              has_work_plan: false,
              work_plan: undefined,
              assessment_id: 'assessment-id',
            }),
          ]),
        }),
      }),
    );
  });

  it('should return an empty Students Data Report if professor does not exist', async () => {
    const response = await studentsReportService.execute({
      professor_id: 'invalid-professor',
    });

    expect(response).toEqual(expect.arrayContaining([]));
  });
});
