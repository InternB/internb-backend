import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import UpdateInternshipDatesService from './UpdateInternshipDatesService';
import FakeInternshipsRepository from '../repositories/fakes/FakeInternshipsRepository';

let fakeInternshipsRepository: FakeInternshipsRepository;
let updateInternshipDatesService: UpdateInternshipDatesService;

describe('UpdateInternshipDates', () => {
  beforeEach(() => {
    fakeInternshipsRepository = new FakeInternshipsRepository();
    updateInternshipDatesService = new UpdateInternshipDatesService(
      fakeInternshipsRepository,
    );
  });

  it('should update the beginning and ending dates of the internship', async () => {
    const { id } = await fakeInternshipsRepository.create({
      student_id: 'student-id',
      class_id: 'class-id',
      class_discipline_id: 'discipline-id',
      class_professor_id: 'professor-id',
    });

    const begins = Date.now();
    const ends = Date.now();

    const response = await updateInternshipDatesService.execute({
      id,
      begins,
      ends,
    });

    expect(response).toEqual(
      expect.objectContaining({
        id,
        begins_at: new Date(begins),
        finishes_at: new Date(ends),
      }),
    );
  });

  it('should not update the beginning and ending date if internship does not exist', async () => {
    await expect(
      updateInternshipDatesService.execute({
        id: 'invalid-internship',
        begins: Date.now(),
        ends: Date.now(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
