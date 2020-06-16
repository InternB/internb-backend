import 'reflect-metadata';

import CreateAdmRegionService from './CreateAdmRegionService';

import FakeAdmRegionsRepository from '../repositories/fakes/FakeAdmRegionsRepository';

let createAdmRegionService: CreateAdmRegionService;
let fakeAdmRegionsRepository: FakeAdmRegionsRepository;

describe('CreateAdmRegion', () => {
  beforeEach(() => {
    fakeAdmRegionsRepository = new FakeAdmRegionsRepository();
    createAdmRegionService = new CreateAdmRegionService(
      fakeAdmRegionsRepository,
    );
  });

  it('should create a new Adminstrative Region', async () => {
    const adm_region = await createAdmRegionService.execute({
      name: 'adm-region-name',
      cre: true,
    });

    expect(adm_region).toEqual(
      expect.objectContaining({
        name: 'adm-region-name',
        cre: true,
      }),
    );
  });
});
