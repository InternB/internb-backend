import 'reflect-metadata';

import ListClassesDisciplineService from './ListClassesDisciplineService';

import FakeClassesRepository from '../repositories/fakes/FakeClassesRepository';

let fakeClassesRepository: FakeClassesRepository;
let listClassesDiscipline: ListClassesDisciplineService;

describe('ListClassesDiscipline', () => {
  beforeEach(async () => {
    fakeClassesRepository = new FakeClassesRepository();
    listClassesDiscipline = new ListClassesDisciplineService(
      fakeClassesRepository,
    );

    await fakeClassesRepository.create({
      sign: 'A',
      semester: '2/2014',
      password: '123456',
      total_students_enrolled: 40,
      discipline_id: 'CIC0123',
      professor_id: 'professor1-id',
    });
    await fakeClassesRepository.create({
      sign: 'B',
      semester: '2/2014',
      password: '123456',
      total_students_enrolled: 40,
      discipline_id: 'CIC0123',
      professor_id: 'professor1-id',
    });
    await fakeClassesRepository.create({
      sign: 'A',
      semester: '2/2014',
      password: '123456',
      total_students_enrolled: 40,
      discipline_id: 'CIC0124',
      professor_id: 'professor2-id',
    });
  });

  it('should list all the classes', async () => {
    const classes = await listClassesDiscipline.execute({
      discipline_id: undefined,
      professor_id: undefined,
    });

    expect(classes.length).toEqual(3);
    expect(classes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          sign: 'A',
          semester: '2/2014',
          total_students_enrolled: 40,
          discipline_id: 'CIC0123',
          professor_id: 'professor1-id',
        }),
        expect.objectContaining({
          sign: 'B',
          semester: '2/2014',
          total_students_enrolled: 40,
          discipline_id: 'CIC0123',
          professor_id: 'professor1-id',
        }),
        expect.objectContaining({
          sign: 'A',
          semester: '2/2014',
          total_students_enrolled: 40,
          discipline_id: 'CIC0124',
          professor_id: 'professor2-id',
        }),
      ]),
    );
  });

  it('should list all the classes of a discipline for all professors', async () => {
    const classes = await listClassesDiscipline.execute({
      discipline_id: 'CIC0124',
      professor_id: undefined,
    });

    expect(classes.length).toEqual(1);
    expect(classes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          sign: 'A',
          semester: '2/2014',
          total_students_enrolled: 40,
          discipline_id: 'CIC0124',
          professor_id: 'professor2-id',
        }),
      ]),
    );
  });

  it('should list all the classes owned by a professor of all disciplines', async () => {
    const classes = await listClassesDiscipline.execute({
      discipline_id: undefined,
      professor_id: 'professor1-id',
    });

    expect(classes.length).toEqual(2);
    expect(classes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          sign: 'A',
          semester: '2/2014',
          total_students_enrolled: 40,
          discipline_id: 'CIC0123',
          professor_id: 'professor1-id',
        }),
        expect.objectContaining({
          sign: 'B',
          semester: '2/2014',
          total_students_enrolled: 40,
          discipline_id: 'CIC0123',
          professor_id: 'professor1-id',
        }),
      ]),
    );
  });

  it('should list all the classes owned by a professor a given discipline', async () => {
    const classes = await listClassesDiscipline.execute({
      discipline_id: 'CIC0123',
      professor_id: 'professo2-id',
    });

    expect(classes.length).toEqual(0);
  });
});
