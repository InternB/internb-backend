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
    // Arrange

    // Act
    const disciplines = await listDisciplines.execute();

    // Assert
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
