import 'reflect-metadata';

import User from '@modules/users/infra/typeorm/entities/User';
import FakePreceptorsRepository from '@modules/users/repositories/fakes/FakePreceptorsRepository';
import School from '@modules/schools/infra/typeorm/entities/School';
import FakeSchoolsRepository from '@modules/schools/repositories/fakes/FakeSchoolsRepository';
import ListPreceptosOfSchoolService from './ListPreceptorsOfSchoolService';

let fakeSchoolsRepository: FakeSchoolsRepository;
let fakePreceptorsRepository: FakePreceptorsRepository;
let listPreceptorsOfSchoolService: ListPreceptosOfSchoolService;

describe('ListPreceptorOfSchool', () => {
  beforeEach(() => {
    fakeSchoolsRepository = new FakeSchoolsRepository();
    fakePreceptorsRepository = new FakePreceptorsRepository();
    listPreceptorsOfSchoolService = new ListPreceptosOfSchoolService(
      fakePreceptorsRepository,
    );
  });

  it('should return a list of preceptors registered to a specific school', async () => {
    const { id: school_id } = await fakeSchoolsRepository.create({
      name: 'school-name',
      adm_region_id: 'adm-region-id',
      address: 'school-address',
      cep: 'school-cep',
    });

    await fakePreceptorsRepository.createUserOfType({
      user_id: 'user-id-1',
      experience: 1,
      formation: 'nível de formação',
      school_id,
      user: new User(),
      school: new School(),
      internships: [],
    });

    await fakePreceptorsRepository.createUserOfType({
      user_id: 'user-id-2',
      experience: 1,
      formation: 'nível de formação',
      school_id,
      user: new User(),
      school: new School(),
      internships: [],
    });

    const response = await listPreceptorsOfSchoolService.execute({ school_id });

    expect(response).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          school_id,
        }),
        expect.objectContaining({
          school_id,
        }),
      ]),
    );
  });
});
