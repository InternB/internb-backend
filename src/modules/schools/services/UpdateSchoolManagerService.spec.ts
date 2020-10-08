import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import UpdateSchoolManagerService from './UpdateSchoolManagerService';
import FakeSchoolManagersRepository from '../repositories/fakes/FakeSchoolManagersRepository';

let updateSchoolManager: UpdateSchoolManagerService;
let fakeSchoolManagersRepository: FakeSchoolManagersRepository;

describe('UpdateSchoolManager', () => {
  beforeEach(() => {
    fakeSchoolManagersRepository = new FakeSchoolManagersRepository();
    updateSchoolManager = new UpdateSchoolManagerService(
      fakeSchoolManagersRepository,
    );
  });

  it("should be able to update a given School Manager's information", async () => {
    const { id } = await fakeSchoolManagersRepository.create({
      fullname: 'John Doe',
      role: 0,
      school_id: 'school-id',
      email: 'johndoe@example.com',
      phone: 'manager-phone',
    });

    const updatedSchoolManager = await updateSchoolManager.execute({
      id,
      fullname: 'John Tré',
      role: 1,
      email: 'johntre@example.com',
      phone: 'new-manager-phone',
    });

    expect(updatedSchoolManager).toEqual(
      expect.objectContaining({
        id,
        fullname: 'John Tré',
        role: 1,
        email: 'johntre@example.com',
        phone: 'new-manager-phone',
      }),
    );
  });

  it("should be able to update a given School Manager's information without phone", async () => {
    const { id } = await fakeSchoolManagersRepository.create({
      fullname: 'John Doe',
      role: 0,
      school_id: 'school-id',
      email: 'johndoe@example.com',
      phone: 'manager-phone',
    });

    const updatedSchoolManager = await updateSchoolManager.execute({
      id,
      fullname: 'John Tré',
      role: 1,
      email: 'johntre@example.com',
    });

    expect(updatedSchoolManager).toEqual(
      expect.objectContaining({
        id,
        fullname: 'John Tré',
        role: 1,
        email: 'johntre@example.com',
      }),
    );
  });

  it("should be able to update a given School Manager's information without email", async () => {
    const { id } = await fakeSchoolManagersRepository.create({
      fullname: 'John Doe',
      role: 0,
      school_id: 'school-id',
      email: 'johndoe@example.com',
      phone: 'manager-phone',
    });

    const updatedSchoolManager = await updateSchoolManager.execute({
      id,
      fullname: 'John Tré',
      role: 1,
      phone: 'new-manager-phone',
    });

    expect(updatedSchoolManager).toEqual(
      expect.objectContaining({
        id,
        fullname: 'John Tré',
        role: 1,
        phone: 'new-manager-phone',
      }),
    );
  });

  it('should not be able to updated the information of a non-existing School Manager', async () => {
    await expect(
      updateSchoolManager.execute({
        id: 'non-existing-school-manager-id',
        fullname: 'John Tré',
        role: 1,
        phone: 'new-manager-phone',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
