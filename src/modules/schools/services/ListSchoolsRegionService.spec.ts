import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import ListSchoolsRegionService from './ListSchoolsRegionService';
import FakeSchoolsRepository from '../repositories/fakes/FakeSchoolsRepository';
import FakeAdmRegionsRepository from '../repositories/fakes/FakeAdmRegionsRepository';

let listSchoolsRegion: ListSchoolsRegionService;
let fakeSchoolsRepository: FakeSchoolsRepository;
let fakeAdmRegionsRepository: FakeAdmRegionsRepository;

describe('ListSchoolsRegion', () => {
  beforeEach(() => {
    fakeSchoolsRepository = new FakeSchoolsRepository();
    fakeAdmRegionsRepository = new FakeAdmRegionsRepository();
    listSchoolsRegion = new ListSchoolsRegionService(
      fakeSchoolsRepository,
      fakeAdmRegionsRepository,
    );
  });

  it('should list all public schools of a given region', async () => {
    const public_region = await fakeAdmRegionsRepository.create({
      name: 'adm-region-name',
      cre: true,
    });

    const other_region = await fakeAdmRegionsRepository.create({
      name: 'adm-region-name',
      cre: false,
    });

    const firstSchool = await fakeSchoolsRepository.create({
      name: 'first-school-name',
      adm_region_id: public_region.id,
      adm_region: public_region,
      address: 'first-school-address',
      cep: 'first-school-cep',
    });

    await fakeSchoolsRepository.create({
      name: 'second-school-name',
      adm_region_id: other_region.id,
      adm_region: other_region,
      address: 'second-school-address',
      cep: 'second-school-cep',
    });

    const schools = await listSchoolsRegion.execute({
      adm_region_id: public_region.id,
    });

    expect(schools).toEqual(
      expect.arrayContaining([expect.objectContaining(firstSchool)]),
    );
  });

  it('should list all non-public schools of a given region', async () => {
    const public_region = await fakeAdmRegionsRepository.create({
      name: 'adm-region-name',
      cre: true,
    });

    const other_region = await fakeAdmRegionsRepository.create({
      name: 'adm-region-name',
      cre: false,
    });

    await fakeSchoolsRepository.create({
      name: 'first-school-name',
      adm_region_id: public_region.id,
      adm_region: public_region,
      address: 'first-school-address',
      cep: 'first-school-cep',
    });

    const secondSchool = await fakeSchoolsRepository.create({
      name: 'second-school-name',
      adm_region_id: other_region.id,
      adm_region: other_region,
      address: 'second-school-address',
      cep: 'second-school-cep',
    });

    const schools = await listSchoolsRegion.execute({
      adm_region_id: other_region.id,
    });

    expect(schools).toEqual(
      expect.arrayContaining([expect.objectContaining(secondSchool)]),
    );
  });

  it('should not list schools if the given region does not exist', async () => {
    await expect(
      listSchoolsRegion.execute({
        adm_region_id: 'non-existing-adm-region-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
