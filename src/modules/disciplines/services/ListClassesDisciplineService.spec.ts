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
      id: 'A',
      semester: '2/2014',
      total_students_enrolled: 40,
      discipline_id: 'CIC0123',
      professor_id: 'professor1-id',
      pdf_guide: 'pdf-guide.pdf',
    });
    await fakeClassesRepository.create({
      id: 'B',
      semester: '2/2014',
      total_students_enrolled: 40,
      discipline_id: 'CIC0123',
      professor_id: 'professor1-id',
      pdf_guide: 'pdf-guide.pdf',
    });
    await fakeClassesRepository.create({
      id: 'A',
      semester: '2/2014',
      total_students_enrolled: 40,
      discipline_id: 'CIC0124',
      professor_id: 'professor2-id',
      pdf_guide: 'pdf-guide.pdf',
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
          id: 'A',
          semester: '2/2014',
          total_students_enrolled: 40,
          discipline_id: 'CIC0123',
          professor_id: 'professor1-id',
          pdf_guide: 'pdf-guide.pdf',
        }),
        expect.objectContaining({
          id: 'B',
          semester: '2/2014',
          total_students_enrolled: 40,
          discipline_id: 'CIC0123',
          professor_id: 'professor1-id',
          pdf_guide: 'pdf-guide.pdf',
        }),
        expect.objectContaining({
          id: 'A',
          semester: '2/2014',
          total_students_enrolled: 40,
          discipline_id: 'CIC0124',
          professor_id: 'professor2-id',
          pdf_guide: 'pdf-guide.pdf',
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
          id: 'A',
          semester: '2/2014',
          total_students_enrolled: 40,
          discipline_id: 'CIC0124',
          professor_id: 'professor2-id',
          pdf_guide: 'pdf-guide.pdf',
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
          id: 'A',
          semester: '2/2014',
          total_students_enrolled: 40,
          discipline_id: 'CIC0123',
          professor_id: 'professor1-id',
          pdf_guide: 'pdf-guide.pdf',
        }),
        expect.objectContaining({
          id: 'B',
          semester: '2/2014',
          total_students_enrolled: 40,
          discipline_id: 'CIC0123',
          professor_id: 'professor1-id',
          pdf_guide: 'pdf-guide.pdf',
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
