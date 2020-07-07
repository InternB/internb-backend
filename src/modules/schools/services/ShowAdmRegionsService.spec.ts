import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import ShowAdmRegionsService from './ShowAdmRegionsService';
import FakeAdmRegionsRepository from '../repositories/fakes/FakeAdmRegionsRepository';

let showAdmRegionsService: ShowAdmRegionsService;
let fakeAdmRegionsRepository: FakeAdmRegionsRepository;

describe('ShowAdmRegions', () => {
  beforeEach(() => {
    fakeAdmRegionsRepository = new FakeAdmRegionsRepository();
    showAdmRegionsService = new ShowAdmRegionsService(fakeAdmRegionsRepository);
  });

  it("should return all the public schools RTC's (CRE's)", async () => {
    await fakeAdmRegionsRepository.create({
      name: 'public-school-region',
      cre: true,
    });

    await fakeAdmRegionsRepository.create({
      name: 'other-school-region',
      cre: false,
    });

    const regions = await showAdmRegionsService.execute({
      region_filter: 'cre',
    });

    expect(regions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'public-school-region',
          cre: true,
        }),
      ]),
    );
  });

  it("should return all the private/federal schools Administrative Regions (RA's)", async () => {
    await fakeAdmRegionsRepository.create({
      name: 'public-school-region',
      cre: true,
    });

    await fakeAdmRegionsRepository.create({
      name: 'other-school-region',
      cre: false,
    });

    const regions = await showAdmRegionsService.execute({
      region_filter: 'other',
    });

    expect(regions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'other-school-region',
          cre: false,
        }),
      ]),
    );
  });

  it('should return all the regions for public, private and federal schools', async () => {
    await fakeAdmRegionsRepository.create({
      name: 'public-school-region',
      cre: true,
    });

    await fakeAdmRegionsRepository.create({
      name: 'other-school-region',
      cre: false,
    });

    const regions = await showAdmRegionsService.execute({});

    expect(regions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'public-school-region',
          cre: true,
        }),
        expect.objectContaining({
          name: 'other-school-region',
          cre: false,
        }),
      ]),
    );
  });

  it("should not return any data if the 'region_filter' has an invalid value", async () => {
    await expect(
      showAdmRegionsService.execute({ region_filter: 'invalid-region-filter' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
