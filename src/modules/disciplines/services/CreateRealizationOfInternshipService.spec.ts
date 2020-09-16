import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeInternshipsRepository from '../repositories/fakes/FakeInternshipsRepository';
import FakeRealizationsRepository from '../repositories/fakes/FakeRealizationsRepository';

import CreateRealizationOfInternshipService from './CreateRealizationOfInternshipService';

let fakeInternshipsRepository: FakeInternshipsRepository;
let fakeRealizationsRepository: FakeRealizationsRepository;
let createRealizationOfInternshipService: CreateRealizationOfInternshipService;

describe('CreateRealizationOfInternship', () => {
  beforeEach(() => {
    fakeInternshipsRepository = new FakeInternshipsRepository();
    fakeRealizationsRepository = new FakeRealizationsRepository();
    createRealizationOfInternshipService = new CreateRealizationOfInternshipService(
      fakeInternshipsRepository,
      fakeRealizationsRepository,
    );
  });

  it("should create a realization of internship of type 'individual'", async () => {
    const { id: internship_id } = await fakeInternshipsRepository.create({
      student_id: 'student-id',
      class_id: 'class-id',
      class_discipline_id: 'discipline-id',
      class_professor_id: 'professor-id',
    });

    const response = await createRealizationOfInternshipService.execute({
      internship_id,
      type: 1,
      names: [],
    });

    expect(response).toEqual(
      expect.objectContaining({
        type: 1,
        names: expect.arrayContaining([]),
      }),
    );
  });

  it("should create a realization of internship of type 'in group'", async () => {
    const { id: internship_id } = await fakeInternshipsRepository.create({
      student_id: 'student-id',
      class_id: 'class-id',
      class_discipline_id: 'discipline-id',
      class_professor_id: 'professor-id',
    });

    const response = await createRealizationOfInternshipService.execute({
      internship_id,
      type: 2,
      names: ['John Doe'],
    });

    expect(response).toEqual(
      expect.objectContaining({
        type: 2,
        names: expect.arrayContaining(['John Doe']),
      }),
    );
  });

  it('should not create a realization if internship does not exist', async () => {
    await expect(
      createRealizationOfInternshipService.execute({
        internship_id: 'invalid-internship-id',
        type: 1,
        names: [],
      }),
    );
  });

  it('should not create a realization if internship already has one', async () => {
    const internship = await fakeInternshipsRepository.create({
      student_id: 'student-id',
      class_id: 'class-id',
      class_discipline_id: 'discipline-id',
      class_professor_id: 'professor-id',
    });
    const { id: internship_id } = internship;
    internship.realization_id = 'realization-id';
    await fakeInternshipsRepository.save(internship);

    await expect(
      createRealizationOfInternshipService.execute({
        internship_id,
        type: 1,
        names: [],
      }),
    );
  });

  it("should not create a realization if 'in group' select, but no names are given", async () => {
    const { id: internship_id } = await fakeInternshipsRepository.create({
      student_id: 'student-id',
      class_id: 'class-id',
      class_discipline_id: 'discipline-id',
      class_professor_id: 'professor-id',
    });

    await expect(
      createRealizationOfInternshipService.execute({
        internship_id,
        type: 2,
        names: [],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
