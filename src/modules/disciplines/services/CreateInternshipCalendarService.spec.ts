import 'reflect-metadata';
import { addMinutes } from 'date-fns';

import AppError from '@shared/errors/AppError';
import FakeCalendarsRepository from '../repositories/fakes/FakeCalendarsRepository';
import FakeInternshipsRepository from '../repositories/fakes/FakeInternshipsRepository';
import CreateInternshipCalendarService from './CreateInternshipCalendarService';

let fakeInternshipsRepository: FakeInternshipsRepository;
let fakeCalendarsRepository: FakeCalendarsRepository;
let createInternshipCalendarService: CreateInternshipCalendarService;

describe('CreateInternshipCalendar', () => {
  beforeEach(() => {
    fakeInternshipsRepository = new FakeInternshipsRepository();
    fakeCalendarsRepository = new FakeCalendarsRepository();

    createInternshipCalendarService = new CreateInternshipCalendarService(
      fakeInternshipsRepository,
      fakeCalendarsRepository,
    );
  });

  it('should create the calendar for an intership', async () => {
    const internship = await fakeInternshipsRepository.create({
      student_id: 'student-id',
      class_id: 'class-id',
      class_discipline_id: 'discipline-id',
      class_professor_id: 'professor-id',
    });
    internship.school_id = 'school-id';
    internship.preceptor_id = 'preceptor-id';
    await fakeInternshipsRepository.save(internship);
    const { id: internship_id } = internship;

    const starts_at: Date[] = [];
    for (let i = 0; i < 5; i += 1)
      starts_at.push(new Date(2020, 10, 17, 17, 40));

    const finishes_at: Date[] = [];
    for (let i = 0; i < 5; i += 1) {
      const date = new Date(2020, 10, 17, 17, 40);
      finishes_at.push(addMinutes(date, 1));
    }

    const response = await createInternshipCalendarService.execute({
      internship_id,
      calendar: { starts_at, finishes_at },
    });

    expect(response.id).toBeTruthy();
  });

  it('should not create a calendar if internship does not exist', async () => {
    const starts_at: Date[] = [];
    for (let i = 0; i < 5; i += 1)
      starts_at.push(new Date(2020, 10, 17, 17, 40));

    const finishes_at: Date[] = [];
    for (let i = 0; i < 5; i += 1) {
      const date = new Date(2020, 10, 17, 17, 40);
      finishes_at.push(addMinutes(date, 1));
    }

    await expect(
      createInternshipCalendarService.execute({
        internship_id: 'invalid-internship',
        calendar: { starts_at, finishes_at },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not create a calendar if internship does not have school', async () => {
    const { id: internship_id } = await fakeInternshipsRepository.create({
      student_id: 'student-id',
      class_id: 'class-id',
      class_discipline_id: 'discipline-id',
      class_professor_id: 'professor-id',
    });

    const starts_at: Date[] = [];
    for (let i = 0; i < 5; i += 1)
      starts_at.push(new Date(2020, 10, 17, 17, 40));

    const finishes_at: Date[] = [];
    for (let i = 0; i < 5; i += 1) {
      const date = new Date(2020, 10, 17, 17, 40);
      finishes_at.push(addMinutes(date, 1));
    }

    await expect(
      createInternshipCalendarService.execute({
        internship_id,
        calendar: { starts_at, finishes_at },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not create a calendar if internship does not have a preceptor', async () => {
    const internship = await fakeInternshipsRepository.create({
      student_id: 'student-id',
      class_id: 'class-id',
      class_discipline_id: 'discipline-id',
      class_professor_id: 'professor-id',
    });
    internship.school_id = 'school-id';
    await fakeInternshipsRepository.save(internship);
    const { id: internship_id } = internship;

    const starts_at: Date[] = [];
    for (let i = 0; i < 5; i += 1)
      starts_at.push(new Date(2020, 10, 17, 17, 40));

    const finishes_at: Date[] = [];
    for (let i = 0; i < 5; i += 1) {
      const date = new Date(2020, 10, 17, 17, 40);
      finishes_at.push(addMinutes(date, 1));
    }

    await expect(
      createInternshipCalendarService.execute({
        internship_id,
        calendar: { starts_at, finishes_at },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it.each`
    invalid_date
    ${0}
    ${1}
    ${2}
    ${3}
    ${4}
  `(
    'should not create a calendar if any pair of dates is invalid',
    async ({ invalid_date }: { invalid_date: number }) => {
      const internship = await fakeInternshipsRepository.create({
        student_id: 'student-id',
        class_id: 'class-id',
        class_discipline_id: 'discipline-id',
        class_professor_id: 'professor-id',
      });
      internship.school_id = 'school-id';
      internship.preceptor_id = 'preceptor-id';
      await fakeInternshipsRepository.save(internship);
      const { id: internship_id } = internship;

      const starts_at: Date[] = [];
      for (let i = 0; i < 5; i += 1)
        starts_at.push(new Date(2020, 10, 17, 17, 40));

      const finishes_at: Date[] = [];
      for (let i = 0; i < 5; i += 1) {
        const date = new Date(2020, 10, 17, 17, 40);
        finishes_at.push(addMinutes(date, invalid_date === i ? -1 : 1));
      }

      await expect(
        createInternshipCalendarService.execute({
          internship_id,
          calendar: { starts_at, finishes_at },
        }),
      ).rejects.toBeInstanceOf(AppError);
    },
  );
});
