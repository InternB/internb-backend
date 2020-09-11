import 'reflect-metadata';

import FakePreceptorsRepository from '@modules/users/repositories/fakes/FakePreceptorsRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import School from '@modules/schools/infra/typeorm/entities/School';
import AppError from '@shared/errors/AppError';
import CreateInternshipAssessmentService from './CreateInternshipAssessmentService';
import FakeInternshipsRepository from '../repositories/fakes/FakeInternshipsRepository';
import FakeAssessmentsRepository from '../repositories/fakes/FakeAssessmentsRepository';

let fakePreceptorsRepository: FakePreceptorsRepository;
let fakeInternshipsRepository: FakeInternshipsRepository;
let fakeAssessmentsRepository: FakeAssessmentsRepository;
let createInternshipAssessmentService: CreateInternshipAssessmentService;

describe('CreateInternshipAssessment', () => {
  beforeEach(() => {
    fakePreceptorsRepository = new FakePreceptorsRepository();
    fakeInternshipsRepository = new FakeInternshipsRepository();
    fakeAssessmentsRepository = new FakeAssessmentsRepository();
    createInternshipAssessmentService = new CreateInternshipAssessmentService(
      fakePreceptorsRepository,
      fakeInternshipsRepository,
      fakeAssessmentsRepository,
    );
  });

  it("should be able to create assessment to preceptor's intern", async () => {
    const internship = await fakeInternshipsRepository.create({
      student_id: 'student-id',
      class_id: 'class-id',
      class_discipline_id: 'discipline-id',
      class_professor_id: 'professor-id',
    });
    const { id: internship_id } = internship;

    const { id, user_id } = await fakePreceptorsRepository.createUserOfType({
      user_id: 'user-id',
      experience: 1,
      formation: 'nível de formação',
      user: new User(),
      school: new School(),
      internships: [],
    });

    internship.preceptor_id = id;
    await fakeInternshipsRepository.save(internship);

    const response = await createInternshipAssessmentService.execute({
      user_id,
      assessment_data: {
        internship_id,
        class_experience: [1],
        class_plan: [2],
        communication: [3],
        content: [4],
        didactic: [5],
        ended: true,
        evaluation: [6],
        general: [7],
        methodology: [8],
      },
    });

    expect(response).toEqual(
      expect.objectContaining({
        internship_id,
      }),
    );
  });

  it('should not be able to create assessment if preceptor does not exist', async () => {
    await expect(
      createInternshipAssessmentService.execute({
        user_id: 'invalid-preceptor',
        assessment_data: {
          internship_id: 'internship-id',
          class_experience: [1],
          class_plan: [2],
          communication: [3],
          content: [4],
          didactic: [5],
          ended: true,
          evaluation: [6],
          general: [7],
          methodology: [8],
        },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create assessment if intern does not exist', async () => {
    const { user_id } = await fakePreceptorsRepository.createUserOfType({
      user_id: 'user-id',
      experience: 1,
      formation: 'nível de formação',
      user: new User(),
      school: new School(),
      internships: [],
    });

    await expect(
      createInternshipAssessmentService.execute({
        user_id,
        assessment_data: {
          internship_id: 'invalid-internship-id',
          class_experience: [1],
          class_plan: [2],
          communication: [3],
          content: [4],
          didactic: [5],
          ended: true,
          evaluation: [6],
          general: [7],
          methodology: [8],
        },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not create assessment if intern is not registered to preceptor', async () => {
    const internship = await fakeInternshipsRepository.create({
      student_id: 'student-id',
      class_id: 'class-id',
      class_discipline_id: 'discipline-id',
      class_professor_id: 'professor-id',
    });
    const { id: internship_id } = internship;
    internship.preceptor_id = 'any-otherpreceptor-id';
    await fakeInternshipsRepository.save(internship);

    const { user_id } = await fakePreceptorsRepository.createUserOfType({
      user_id: 'user-id',
      experience: 1,
      formation: 'nível de formação',
      user: new User(),
      school: new School(),
      internships: [],
    });

    await expect(
      createInternshipAssessmentService.execute({
        user_id,
        assessment_data: {
          internship_id,
          class_experience: [1],
          class_plan: [2],
          communication: [3],
          content: [4],
          didactic: [5],
          ended: true,
          evaluation: [6],
          general: [7],
          methodology: [8],
        },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
