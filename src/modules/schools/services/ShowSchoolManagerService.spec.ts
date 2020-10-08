import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import ShowSchoolManagerService from './ShowSchoolManagerService';
import FakeSchoolManagersRepository from '../repositories/fakes/FakeSchoolManagersRepository';

let showSchoolManagerService: ShowSchoolManagerService;
let fakeSchoolManagersRepository: FakeSchoolManagersRepository;

describe('ShowSchoolManager', () => {
  beforeEach(() => {
    fakeSchoolManagersRepository = new FakeSchoolManagersRepository();
    showSchoolManagerService = new ShowSchoolManagerService(
      fakeSchoolManagersRepository,
    );
  });

  it('should show the School Manager information', async () => {
    const { id } = await fakeSchoolManagersRepository.create({
      fullname: 'John Doe',
      role: 0,
      school_id: 'school-id',
      email: 'johndoe@example.com',
      phone: 'manager-phone',
    });

    const schoolManager = await showSchoolManagerService.execute({ id });

    expect(schoolManager).toEqual(
      expect.objectContaining({
        fullname: 'John Doe',
        role: 0,
        school_id: 'school-id',
        email: 'johndoe@example.com',
        phone: 'manager-phone',
      }),
    );
  });

  it('should not show any School Manager information if he/she does not exist', async () => {
    await expect(
      showSchoolManagerService.execute({
        id: 'non-existing-school-manager-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
