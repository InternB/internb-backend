/* eslint-disable no-await-in-loop */

import 'reflect-metadata';

import FakeSchoolsRepository from '@modules/schools/repositories/fakes/FakeSchoolsRepository';
import FakePreceptorsRepository from '@modules/users/repositories/fakes/FakePreceptorsRepository';
import School from '@modules/schools/infra/typeorm/entities/School';
import Preceptor from '@modules/users/infra/typeorm/entities/Preceptor';
import AppError from '@shared/errors/AppError';
import FakeProfessorsRepository from '@modules/users/repositories/fakes/FakeProfessorsRepository';
import Professor from '@modules/users/infra/typeorm/entities/Professor';
import User from '@modules/users/infra/typeorm/entities/User';
import FakeInternshipsRepository from '../repositories/fakes/FakeInternshipsRepository';
import PreceptorsDataReportService from './PreceptorsDataReportService';
import FakeClassesRepository from '../repositories/fakes/FakeClassesRepository';
import Class from '../infra/typeorm/entities/Class';

let fakeSchoolsRepository: FakeSchoolsRepository;
let fakePreceptorsRepository: FakePreceptorsRepository;
let fakeClassesRepository: FakeClassesRepository;
let fakeInternshipsRepository: FakeInternshipsRepository;
let fakeProfessorsRepository: FakeProfessorsRepository;
let preceptorsDataReportService: PreceptorsDataReportService;

let school: School;
let diff_school: School;
let preceptor: Preceptor;
let classes: Class[];

describe('PreceptorsDataReport', () => {
  beforeEach(async () => {
    fakeSchoolsRepository = new FakeSchoolsRepository();
    fakePreceptorsRepository = new FakePreceptorsRepository();
    fakeClassesRepository = new FakeClassesRepository();
    fakeInternshipsRepository = new FakeInternshipsRepository();
    fakeProfessorsRepository = new FakeProfessorsRepository();
    preceptorsDataReportService = new PreceptorsDataReportService(
      fakeInternshipsRepository,
      fakeProfessorsRepository,
    );

    school = await fakeSchoolsRepository.create({
      name: 'Lorem School',
      address: 'Lorem Address Conj. 3 Lote 10',
      adm_region_id: 'adm-region-id',
      cep: 'some-cep',
      email: 'lorem@school.com.br',
      phone: '6112345678',
    });

    diff_school = await fakeSchoolsRepository.create({
      name: 'Lorem School',
      address: 'Lorem Address Conj. 3 Lote 10',
      adm_region_id: 'adm-region-id',
      cep: 'some-cep',
      email: 'lorem@school.com.br',
      phone: '6112345678',
    });

    const newPreceptor = new Preceptor();
    Object.assign(newPreceptor, {
      school,
      school_id: school.id,
      experience: 1,
      formation: 'Mestre',
    });
    preceptor = await fakePreceptorsRepository.createUserOfType(newPreceptor);

    classes = [];
    classes.push(
      await fakeClassesRepository.create({
        total_students_enrolled: 40,
        discipline_id: 'discipline-id',
        professor_id: 'professor-id',
        sign: 'A',
        password: '123456',
        semester: '2/2020',
      }),
      await fakeClassesRepository.create({
        total_students_enrolled: 40,
        discipline_id: 'discipline-id',
        professor_id: 'professor-id',
        sign: 'B',
        password: '123456',
        semester: '2/2020',
      }),
    );

    let professor = new Professor();
    Object.assign(professor, {
      user: new User(),
    });
    professor = await fakeProfessorsRepository.createUserOfType(professor);
    professor.id = 'professor-id';
    await fakeProfessorsRepository.saveUserOfType(professor);
  });

  it('should return the Preceptors Data Report', async () => {
    for (let i = 0; i < 8; i += 1) {
      const internship = await fakeInternshipsRepository.create({
        student_id: `student-id-${i}`,
        class_discipline_id: 'class-discipline-id',
        class_id: `class-id-${i}`,
        class_professor_id: 'professor-id',
      });

      if (i % 2) {
        internship.school = school;
        internship.school_id = school.id;
        internship.preceptor = preceptor;
        internship.preceptor_id = preceptor.id;

        if (i === 3) {
          internship.school = diff_school;
          internship.school_id = diff_school.id;

          const newPreceptor = new Preceptor();
          Object.assign(newPreceptor, {
            school,
            school_id: school.id,
            experience: 1,
            formation: 'Mestre',
          });
          preceptor = await fakePreceptorsRepository.createUserOfType(
            newPreceptor,
          );

          internship.preceptor = preceptor;
          internship.preceptor_id = preceptor.id;
        }
      }

      internship.class = classes[i % 2];

      await fakeInternshipsRepository.save(internship);
    }

    const response = await preceptorsDataReportService.execute({
      professor_id: 'professor-id',
    });

    expect(response).toEqual(
      expect.objectContaining({
        'class-discipline-id': expect.objectContaining({
          A: expect.objectContaining({
            total_students: 40,
            total_preceptors: 0,
            total_students_with_preceptors: 0,
            preceptors: expect.arrayContaining([]),
            schools: expect.arrayContaining([]),
          }),
          B: expect.objectContaining({
            total_students: 40,
            total_preceptors: 2,
            total_students_with_preceptors: 4,
            preceptors: expect.arrayContaining([
              expect.objectContaining(preceptor),
            ]),
            schools: expect.arrayContaining([expect.anything()]),
          }),
        }),
      }),
    );
  });

  it('should not return any data if professor does not exist', async () => {
    await expect(
      preceptorsDataReportService.execute({
        professor_id: 'invalid-professor-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
