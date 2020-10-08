import 'reflect-metadata';

import ListDisciplinesService from './ListDisciplinesService';
import FakeDisciplinesRepository from '../repositories/fakes/FakeDisciplinesRepository';

let listDisciplines: ListDisciplinesService;
let fakeDisciplinesRepository: FakeDisciplinesRepository;

describe('ListDisciplines', () => {
  beforeEach(() => {
    fakeDisciplinesRepository = new FakeDisciplinesRepository();
    listDisciplines = new ListDisciplinesService(fakeDisciplinesRepository);
  });

  it('should return all registered disciplines', async () => {
    fakeDisciplinesRepository.create({ id: 'CIC0124', name: 'Estágio 1' });
    fakeDisciplinesRepository.create({ id: 'CIC473', name: 'Estágio 2' });

    const disciplines = await listDisciplines.execute();

    expect(disciplines.length).toEqual(2);
    expect(disciplines).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.stringContaining('CIC'),
        }),
        expect.objectContaining({
          id: expect.stringContaining('CIC'),
        }),
      ]),
    );
  });
});
