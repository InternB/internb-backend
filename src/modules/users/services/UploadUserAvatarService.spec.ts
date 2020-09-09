import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

import UploadUserAvatarService from './UploadUserAvatarService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import User from '../infra/typeorm/entities/User';

let uploadUserAvatar: UploadUserAvatarService;
let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;

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

describe('UploadUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    uploadUserAvatar = new UploadUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it("should be able to upload a new user's avatar image", async () => {
    const user = createUser();

    const { id } = await fakeUsersRepository.create(user);

    const response = await uploadUserAvatar.execute({
      id,
      avatar: 'avatar-filename.png',
    });

    expect(response).toEqual(
      expect.objectContaining({
        id,
        avatar: 'avatar-filename.png',
      }),
    );
  });

  it("should not be able to upload a new user's avatar image if user does not exist", async () => {
    await expect(
      uploadUserAvatar.execute({
        id: 'non-existing-user-id',
        avatar: 'avatar-filename.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
