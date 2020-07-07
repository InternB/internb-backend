import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import UpdateSchoolService from './UpdateSchoolService';
import FakeSchoolsRepository from '../repositories/fakes/FakeSchoolsRepository';
import FakeAdmRegionsRepository from '../repositories/fakes/FakeAdmRegionsRepository';

let fakeSchoolsRepository: FakeSchoolsRepository;
let fakeAdmRegionsRepository: FakeAdmRegionsRepository;
let updateSchoolService: UpdateSchoolService;

describe('UpdateSchool', () => {
  beforeEach(() => {
    fakeSchoolsRepository = new FakeSchoolsRepository();
    fakeAdmRegionsRepository = new FakeAdmRegionsRepository();
    updateSchoolService = new UpdateSchoolService(
      fakeSchoolsRepository,
      fakeAdmRegionsRepository,
    );
  });

  it('should update the school information', async () => {
    const { id: adm_region_id } = await fakeAdmRegionsRepository.create({
      name: 'adm-region-name',
      cre: true,
    });

    const { id } = await fakeSchoolsRepository.create({
      name: 'school-name',
      adm_region_id,
      address: 'school-address',
      cep: 'school-cep',
    });

    const updatedSchool = await updateSchoolService.execute({
      id,
      name: 'new-school-name',
      adm_region_id,
      cep: 'new-school-cep',
      address: 'new-school-address',
      phone: 'new-school-phone',
      email: 'new-school-email',
    });

    expect(updatedSchool).toEqual(
      expect.objectContaining({
        id,
        name: 'new-school-name',
        adm_region_id,
        cep: 'new-school-cep',
        address: 'new-school-address',
        phone: 'new-school-phone',
        email: 'new-school-email',
      }),
    );
  });

  it('should update the school information without phone', async () => {
    const { id: adm_region_id } = await fakeAdmRegionsRepository.create({
      name: 'adm-region-name',
      cre: true,
    });

    const { id } = await fakeSchoolsRepository.create({
      name: 'school-name',
      adm_region_id,
      address: 'school-address',
      cep: 'school-cep',
    });

    const updatedSchool = await updateSchoolService.execute({
      id,
      name: 'new-school-name',
      adm_region_id,
      cep: 'new-school-cep',
      address: 'new-school-address',
      email: 'new-school-email',
    });

    expect(updatedSchool).toEqual(
      expect.objectContaining({
        id,
        name: 'new-school-name',
        adm_region_id,
        cep: 'new-school-cep',
        address: 'new-school-address',
        email: 'new-school-email',
      }),
    );
  });

  it('should update the school information without email', async () => {
    const { id: adm_region_id } = await fakeAdmRegionsRepository.create({
      name: 'adm-region-name',
      cre: true,
    });

    const { id } = await fakeSchoolsRepository.create({
      name: 'school-name',
      adm_region_id,
      address: 'school-address',
      cep: 'school-cep',
    });

    const updatedSchool = await updateSchoolService.execute({
      id,
      name: 'new-school-name',
      adm_region_id,
      cep: 'new-school-cep',
      address: 'new-school-address',
      phone: 'new-school-phone',
    });

    expect(updatedSchool).toEqual(
      expect.objectContaining({
        id,
        name: 'new-school-name',
        adm_region_id,
        cep: 'new-school-cep',
        address: 'new-school-address',
        phone: 'new-school-phone',
      }),
    );
  });

  it('should not update if the Adminstrative Region does not exist', async () => {
    const { id } = await fakeSchoolsRepository.create({
      name: 'school-name',
      adm_region_id: 'adm-region',
      address: 'school-address',
      cep: 'school-cep',
    });

    await expect(
      updateSchoolService.execute({
        id,
        name: 'new-school-name',
        adm_region_id: 'non-existing-adm-region',
        cep: 'new-school-cep',
        address: 'new-school-address',
        phone: 'new-school-phone',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not update if the school does not exist', async () => {
    const { id: adm_region_id } = await fakeAdmRegionsRepository.create({
      name: 'adm-region-name',
      cre: true,
    });

    await expect(
      updateSchoolService.execute({
        id: 'non-existing-school-id',
        name: 'new-school-name',
        adm_region_id,
        cep: 'new-school-cep',
        address: 'new-school-address',
        phone: 'new-school-phone',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
