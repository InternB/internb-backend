import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeClassesRepository from '../repositories/fakes/FakeClassesRepository';

import ClassesReportService from './ClassesReportService';
import ListClassesDisciplineService from './ListClassesDisciplineService';

let fakeClassesRepository: FakeClassesRepository;
let listClassesDisciplineService: ListClassesDisciplineService;
let classesReportService: ClassesReportService;

describe('ClassesReport', () => {
  beforeEach(async () => {
    fakeClassesRepository = new FakeClassesRepository();
    listClassesDisciplineService = new ListClassesDisciplineService(
      fakeClassesRepository,
    );
    classesReportService = new ClassesReportService(
      listClassesDisciplineService,
    );

    let someClass = await fakeClassesRepository.create({
      sign: 'A',
      semester: '2/2014',
      password: '123456',
      total_students_enrolled: 40,
      discipline_id: 'CIC0123',
      professor_id: 'professor1-id',
    });
    someClass.total_students_registered = Math.random() * 40 + 1;
    await fakeClassesRepository.save(someClass);
    someClass = await fakeClassesRepository.create({
      sign: 'B',
      semester: '2/2014',
      password: '123456',
      total_students_enrolled: 40,
      discipline_id: 'CIC0123',
      professor_id: 'professor1-id',
    });
    someClass.total_students_registered = Math.random() * 40 + 1;
    await fakeClassesRepository.save(someClass);
    someClass = await fakeClassesRepository.create({
      sign: 'A',
      semester: '2/2014',
      password: '123456',
      total_students_enrolled: 40,
      discipline_id: 'CIC0124',
      professor_id: 'professor2-id',
    });
    someClass.total_students_registered = Math.random() * 40 + 1;
    await fakeClassesRepository.save(someClass);
  });

  it('should return the Classes Data Report', async () => {
    const professor_id = 'professor1-id';

    const response = await classesReportService.execute({ professor_id });

    expect(response).toEqual(
      expect.objectContaining({
        disciplinesTotal: 1,
        disciplinesCodes: expect.arrayContaining(['CIC0123']),
        disciplinesClasses: expect.objectContaining({
          CIC0123: expect.arrayContaining(['A', 'B']),
        }),
        classesEnrolled: [40, 40],
        classesRegistered: expect.arrayContaining([
          expect.any(Number),
          expect.any(Number),
        ]),
      }),
    );
  });

  it('should return an empty Classes Data Report if professor does not exist', async () => {
    const professor_id = 'invalid-professor';

    await expect(
      classesReportService.execute({ professor_id }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
