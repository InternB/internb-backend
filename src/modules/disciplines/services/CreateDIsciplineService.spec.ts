import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import CreateDisciplineService from './CreateDisciplineService';
import FakeDisciplinesRepository from '../repositories/fakes/FakeDisciplinesRepository';

let createDiscipline: CreateDisciplineService;
let fakeDisciplinesRepository: FakeDisciplinesRepository;

describe('ListDisciplines', () => {
  beforeEach(() => {
    fakeDisciplinesRepository = new FakeDisciplinesRepository();
    createDiscipline = new CreateDisciplineService(fakeDisciplinesRepository);
  });

  it('should create a new discipline', async () => {
    const disciplines = await createDiscipline.execute({
      id: 'CIC0124',
      name: 'Estágio 1',
    });

    expect(disciplines).toEqual(
      expect.objectContaining({
        id: 'CIC0124',
        name: 'Estágio 1',
      }),
    );
  });

  it('should not create a new discipline if id is not unique', async () => {
    await fakeDisciplinesRepository.create({
      id: 'CIC0124',
      name: 'Estágio 1',
    });

    await expect(
      createDiscipline.execute({ id: 'CIC0124', name: 'discipline-name' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not create a new discipline if name is not unique', async () => {
    await fakeDisciplinesRepository.create({
      id: 'CIC0124',
      name: 'Estágio 1',
    });

    await expect(
      createDiscipline.execute({ id: 'CIC0125', name: 'Estágio 1' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
