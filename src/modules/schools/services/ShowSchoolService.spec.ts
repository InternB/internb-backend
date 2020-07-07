import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import ShowSchoolService from './ShowSchoolService';
import FakeSchoolsRepository from '../repositories/fakes/FakeSchoolsRepository';

let fakeSchoolsRepository: FakeSchoolsRepository;
let showSchoolService: ShowSchoolService;

describe('ShowSchool', () => {
  beforeEach(() => {
    fakeSchoolsRepository = new FakeSchoolsRepository();
    showSchoolService = new ShowSchoolService(fakeSchoolsRepository);
  });

  it('should show the information of a given School', async () => {
    const { id } = await fakeSchoolsRepository.create({
      name: 'school-name',
      adm_region_id: 'adm-region-id',
      address: 'school-address',
      cep: 'school-cep',
    });

    const school = await showSchoolService.execute({ id });

    expect(school).toEqual(
      expect.objectContaining({
        name: 'school-name',
        adm_region_id: 'adm-region-id',
        address: 'school-address',
        cep: 'school-cep',
      }),
    );
  });

  it('should not show the information of a School if it does not exist', async () => {
    await expect(
      showSchoolService.execute({ id: 'non-existing-school-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
