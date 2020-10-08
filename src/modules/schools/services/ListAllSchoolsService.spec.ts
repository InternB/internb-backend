import 'reflect-metadata';

import ListAllSchoolsService from './ListAllSchoolsService';
import FakeSchoolsRepository from '../repositories/fakes/FakeSchoolsRepository';

let fakeSchoolsRepository: FakeSchoolsRepository;
let listAllSchoolsService: ListAllSchoolsService;

describe('ListAllSchools', () => {
  beforeEach(() => {
    fakeSchoolsRepository = new FakeSchoolsRepository();
    listAllSchoolsService = new ListAllSchoolsService(fakeSchoolsRepository);
  });

  it('should list all registered schools', async () => {
    await fakeSchoolsRepository.create({
      name: 'school-name',
      adm_region_id: 'adm-region-id',
      address: 'school-address',
      cep: 'school-cep',
    });

    await fakeSchoolsRepository.create({
      name: 'school-name',
      adm_region_id: 'adm-region-id',
      address: 'school-address',
      cep: 'school-cep',
    });

    const schools = await listAllSchoolsService.execute();

    expect(schools.length).toEqual(2);
  });
});
