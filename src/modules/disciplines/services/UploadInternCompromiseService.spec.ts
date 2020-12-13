import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import UploadInternCompromiseService from './UploadInternCompromiseService';
import FakeInternshipsRepository from '../repositories/fakes/FakeInternshipsRepository';

let fakeInternshipsRepository: FakeInternshipsRepository;
let uploadInternCompromise: UploadInternCompromiseService;

describe('UploadInternCompromise', () => {
  beforeEach(() => {
    fakeInternshipsRepository = new FakeInternshipsRepository();

    uploadInternCompromise = new UploadInternCompromiseService(
      fakeInternshipsRepository,
    );
  });

  it("should be able to upload internship's compromise", async () => {
    const { id: internship_id } = await fakeInternshipsRepository.create({
      student_id: 'student-id',
      class_id: 'class-id',
      class_discipline_id: 'class-discipline-id',
      class_professor_id: 'class-professor-id',
    });

    const internship = await uploadInternCompromise.execute({
      internship_id,
      compromise: 'compromise.pdf',
    });

    expect(internship.compromise).not.toBeNull();
    expect(internship.compromise).toEqual(expect.any(String));
  });

  it("should not upload the internship's compromise if the internship doesn't exist", async () => {
    await expect(
      uploadInternCompromise.execute({
        internship_id: 'invalid-internship',
        compromise: 'compromise.pdf',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not upload the internship's compromise if it already has a compromise", async () => {
    const internship = await fakeInternshipsRepository.create({
      student_id: 'student-id',
      class_id: 'class-id',
      class_discipline_id: 'class-discipline-id',
      class_professor_id: 'class-professor-id',
    });

    const { id: internship_id } = internship;
    internship.compromise = 'compromise.pdf';
    await fakeInternshipsRepository.save(internship);

    await expect(
      uploadInternCompromise.execute({
        internship_id,
        compromise: 'compromise.pdf',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
