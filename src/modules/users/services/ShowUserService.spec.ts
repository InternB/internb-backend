import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import ShowUserService from './ShowUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import User from '../infra/typeorm/entities/User';

let fakeUsersRepository: FakeUsersRepository;
let showUserService: ShowUserService;

function createUser(active = true): User {
  const role = Math.floor(Math.random() * 4);

  const user = new User();
  Object.assign(user, {
    cpf: '29676193020',
    email: 'johndoe@gmail.com',
    password: '123456',
    fullname: 'John Doe',
    phone: '61999999999',
    role,
    active,
  });

  return user;
}

describe('ShowUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showUserService = new ShowUserService(fakeUsersRepository);
  });

  it("should show the user's profile information", async () => {
    const user = createUser();

    const { id } = await fakeUsersRepository.create(user);

    const response = await showUserService.execute({
      id,
    });

    expect(response).toEqual(
      expect.objectContaining({
        cpf: '29676193020',
        email: 'johndoe@gmail.com',
        fullname: 'John Doe',
        phone: '61999999999',
        // role: expect.any(Number),
        active: true,
      }),
    );
  });

  it('should not show the profile information if user does not exist', async () => {
    await expect(
      showUserService.execute({
        id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
