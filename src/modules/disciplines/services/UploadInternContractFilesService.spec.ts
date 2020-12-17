import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import UploadInternContractFilesService from './UploadInternContractFilesService';
import FakeInternshipsRepository from '../repositories/fakes/FakeInternshipsRepository';

let fakeInternshipsRepository: FakeInternshipsRepository;
let uploadInternContractFiles: UploadInternContractFilesService;

describe('UploadInternContractFiles', () => {
  beforeEach(() => {
    fakeInternshipsRepository = new FakeInternshipsRepository();
    uploadInternContractFiles = new UploadInternContractFilesService(
      fakeInternshipsRepository,
    );
  });

  it("should upload the internships's contract files and update the internship", async () => {
    const { id: internship_id } = await fakeInternshipsRepository.create({
      student_id: 'student-id',
      class_id: 'class-id',
      class_discipline_id: 'class-discipline-id',
      class_professor_id: 'class-professor-id',
    });

    const internship = await uploadInternContractFiles.execute({
      internship_id,
      first_copy: 'firstCopy.pdf',
      second_copy: 'secondCopy.pdf',
      third_copy: 'thirdCopy.pdf',
    });

    expect(internship.contract_files).not.toBeNull();
    expect(internship.contract_files.length).toEqual(3);
  });

  it("should not upload the internship's contract files, neither update the internship, if internship doesn't exist", async () => {
    await expect(
      uploadInternContractFiles.execute({
        internship_id: 'invalid-internship',
        first_copy: 'firstCopy.pdf',
        second_copy: 'secondCopy.pdf',
        third_copy: 'thirdCopy.pdf',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not upload the internship's contract files, neither upload the internship, if internship already has contract files", async () => {
    const internship = await fakeInternshipsRepository.create({
      student_id: 'student-id',
      class_id: 'class-id',
      class_discipline_id: 'class-discipline-id',
      class_professor_id: 'class-professor-id',
    });

    internship.contract_files = [
      'firstCopy.pdf',
      'secondCopy.pdf',
      'thirdCopy.pdf',
    ];
    await fakeInternshipsRepository.save(internship);
    const { id: internship_id } = internship;

    await expect(
      uploadInternContractFiles.execute({
        internship_id,
        first_copy: 'firstCopy.pdf',
        second_copy: 'secondCopy.pdf',
        third_copy: 'thirdCopy.pdf',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
