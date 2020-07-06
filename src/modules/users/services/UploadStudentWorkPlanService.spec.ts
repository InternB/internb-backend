import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UploadStudentWorkPlanService from './UploadStudentWorkPlanService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let uploadStudentWorkPlanService: UploadStudentWorkPlanService;
let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;

describe('UploadStudentWorkPlan', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    uploadStudentWorkPlanService = new UploadStudentWorkPlanService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it("should upload the student's intership work plan", async () => {
    const { id: student_id } = await fakeUsersRepository.create({
      cpf: '72831300045',
      email: 'johndoe@example.com',
      fullname: 'John Doe',
      password: '123456',
      phone: 'some-phone',
      role: 3,
      active: true,
    });

    const { work_plan } = await uploadStudentWorkPlanService.execute({
      student_id,
      work_plan: 'students-work-plan',
    });

    expect(work_plan).toEqual('students-work-plan');
  });

  it('should not upload the internship work plan if the student does not exist', async () => {
    await expect(
      uploadStudentWorkPlanService.execute({
        student_id: 'non-existing-student-id',
        work_plan: 'students-work-plan',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not upload the user's internship work plan if it is not a student", async () => {
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
      uploadStudentWorkPlanService.execute({
        student_id,
        work_plan: 'students-work-plan',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not upload the user's internship work plan if he/she is inactive", async () => {
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
      uploadStudentWorkPlanService.execute({
        student_id,
        work_plan: 'students-work-plan',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
