import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

import UploadUserAvatarService from './UploadUserAvatarService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let uploadUserAvatar: UploadUserAvatarService;
let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;

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
    const { id } = await fakeUsersRepository.create({
      cpf: '72831300045',
      email: 'johndoe@example.com',
      fullname: 'John Doe',
      password: '123456',
      phone: 'some-phone',
      role: 3,
      active: true,
    });

    const user = await uploadUserAvatar.execute({
      id,
      avatar: 'avatar-filename.png',
    });

    expect(user).toEqual(
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

  it("should not be able to upload a new user's avatar image if user is inactive", async () => {
    const { id } = await fakeUsersRepository.create({
      cpf: '72831300045',
      email: 'johndoe@example.com',
      fullname: 'John Doe',
      password: '123456',
      phone: 'some-phone',
      role: 3,
      active: false,
    });

    await expect(
      uploadUserAvatar.execute({
        id,
        avatar: 'avatar-filename.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
