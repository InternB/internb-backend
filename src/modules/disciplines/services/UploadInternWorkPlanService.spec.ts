import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import UploadInternWorkPlanService from './UploadInternWorkPlanService';
import FakeInternshipsRepository from '../repositories/fakes/FakeInternshipsRepository';

let fakeInternshipsRepository: FakeInternshipsRepository;
let uploadInternWorkPlanService: UploadInternWorkPlanService;

describe('UploadInternWorkPlan', () => {
  beforeEach(() => {
    fakeInternshipsRepository = new FakeInternshipsRepository();
    uploadInternWorkPlanService = new UploadInternWorkPlanService(
      fakeInternshipsRepository,
    );
  });

  it("should upload the student's intership work plan", async () => {
    const { id: internship_id } = await fakeInternshipsRepository.create({
      student_id: 'student-id',
      class_id: 'class-id',
      class_discipline_id: 'class-discipline-id',
      class_professor_id: 'class-professor-id',
    });

    const internship = await uploadInternWorkPlanService.execute({
      internship_id,
      work_plan: 'workplan.pdf',
    });

    expect(internship.work_plan).not.toBeNull();
    expect(internship.work_plan).toEqual(expect.any(String));
  });

  it("should not upload the internship's work plan if the internship doesn't exist", async () => {
    await expect(
      uploadInternWorkPlanService.execute({
        internship_id: 'invalid-internship',
        work_plan: 'workplan.pdf',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not upload the internship's work plan if the it already has a work plan", async () => {
    const internship = await fakeInternshipsRepository.create({
      student_id: 'student-id',
      class_id: 'class-id',
      class_discipline_id: 'class-discipline-id',
      class_professor_id: 'class-professor-id',
    });

    internship.work_plan = 'workplan.pdf';
    const { id: internship_id } = internship;
    await fakeInternshipsRepository.save(internship);

    await expect(
      uploadInternWorkPlanService.execute({
        internship_id,
        work_plan: 'workplan.pdf',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
