import 'reflect-metadata';

import FakeDisciplinesRepository from '../repositories/fakes/FakeDisciplinesRepository';
import SearchDisciplinesService from './SearchDisciplinesService';

let fakeDisciplinesRepository: FakeDisciplinesRepository;
let searchDisciplinesService: SearchDisciplinesService;

describe('SearchDisciplines', () => {
  beforeEach(async () => {
    fakeDisciplinesRepository = new FakeDisciplinesRepository();
    searchDisciplinesService = new SearchDisciplinesService(
      fakeDisciplinesRepository,
    );

    await fakeDisciplinesRepository.create({
      id: 'CIC01234',
      name: 'Estágio 1',
    });

    await fakeDisciplinesRepository.create({
      id: 'EST01234',
      name: 'Estágio 1',
    });
  });

  it('should return all disciplines with IDs and names that includes the term', async () => {
    const disciplines = await searchDisciplinesService.execute('EST');

    expect(disciplines).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 'CIC01234', name: 'Estágio 1' }),
        expect.objectContaining({ id: 'EST01234', name: 'Estágio 1' }),
      ]),
    );
  });

  it('should return nothing if term is an empty string', async () => {
    const disciplines = await searchDisciplinesService.execute('');

    expect(disciplines).toEqual(expect.arrayContaining([]));
  });
});
