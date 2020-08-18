// import 'reflect-metadata';
// import AppError from '@shared/errors/AppError';
// import ActivateUserService from './ActivateUserService';
// import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

// let activateUserService: ActivateUserService;
// let fakeUsersRepository: FakeUsersRepository;

// describe('ActivateUser', () => {
//   beforeEach(() => {
//     fakeUsersRepository = new FakeUsersRepository();
//     activateUserService = new ActivateUserService(fakeUsersRepository);
//   });

//   it('should activate a given user', async () => {
//     const { id } = await fakeUsersRepository.create({
//       fullname: 'John Doe',
//       email: 'johndoe@example.com',
//       phone: 'user-phone',
//       cpf: '34268438033',
//       password: '123456',
//       role: Math.floor(Math.random() * 3),
//       active: false,
//     });

//     const activeUser = await activateUserService.execute({ id });

//     expect(activeUser).toEqual(expect.objectContaining({ active: true }));
//   });

//   it('should not activate a given user if it does not exist', async () => {
//     await expect(
//       activateUserService.execute({ id: 'non-existing-user-id' }),
//     ).rejects.toBeInstanceOf(AppError);
//   });
// });
