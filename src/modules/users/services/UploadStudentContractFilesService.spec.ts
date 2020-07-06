import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

import UploadStudentContractFilesService from './UploadStudentContractFilesService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let uploadStudentContractFiles: UploadStudentContractFilesService;
let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;

describe('UploadStudentContractFiles', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    uploadStudentContractFiles = new UploadStudentContractFilesService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it("should move the the contract files from the 'tmp' folder to the definitive folders", async () => {
    const { id: student_id } = await fakeUsersRepository.create({
      cpf: '72831300045',
      email: 'johndoe@example.com',
      fullname: 'John Doe',
      password: '123456',
      phone: 'some-phone',
      role: 3,
      active: true,
    });

    const { contract_files } = await uploadStudentContractFiles.execute({
      student_id,
      commitmentTerm: 'wordexample.docx',
      contract: {
        firstCopy: 'pdfexample.pdf',
        secondCopy: 'pdfexample.pdf',
        thirdCopy: 'pdfexample.pdf',
      },
    });

    expect(contract_files.split(';')).toEqual(
      expect.arrayContaining([
        'wordexample.docx',
        'pdfexample.pdf',
        'pdfexample.pdf',
        'pdfexample.pdf',
      ]),
    );
  });

  it("should not move the contract files from the 'tmp' folder to the definitive folders if the user does not exist", async () => {
    await expect(
      uploadStudentContractFiles.execute({
        student_id: 'non-existing-user',
        commitmentTerm: 'wordexample.docx',
        contract: {
          firstCopy: 'pdfexample.pdf',
          secondCopy: 'pdfexample.pdf',
          thirdCopy: 'pdfexample.pdf',
        },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not move the contract files from the 'tmp' folder to the definitive folders if the user is not a student", async () => {
    const { id: student_id } = await fakeUsersRepository.create({
      cpf: '72831300045',
      email: 'johndoe@example.com',
      fullname: 'John Doe',
      password: '123456',
      phone: 'some-phone',
      role: Math.floor(Math.random() * 3), // 0 through 2
      active: true,
    });

    await expect(
      uploadStudentContractFiles.execute({
        student_id,
        commitmentTerm: 'wordexample.docx',
        contract: {
          firstCopy: 'pdfexample.pdf',
          secondCopy: 'pdfexample.pdf',
          thirdCopy: 'pdfexample.pdf',
        },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to store the contract files in the definitive folders if user is inactive', async () => {
    const { id: student_id } = await fakeUsersRepository.create({
      cpf: '72831300045',
      email: 'johndoe@example.com',
      fullname: 'John Doe',
      password: '123456',
      phone: 'some-phone',
      role: 3,
      active: false,
    });

    await expect(
      uploadStudentContractFiles.execute({
        student_id,
        commitmentTerm: 'wordexample.docx',
        contract: {
          firstCopy: 'pdfexample.pdf',
          secondCopy: 'pdfexample.pdf',
          thirdCopy: 'pdfexample.pdf',
        },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
