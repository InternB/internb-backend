// import 'reflect-metadata';

// import AppError from '@shared/errors/AppError';

// import ShowUserService from './ShowUserService';
// import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

// let fakeUsersRepository: FakeUsersRepository;
// let showUserService: ShowUserService;

// describe('ShowUser', () => {
//   beforeEach(() => {
//     fakeUsersRepository = new FakeUsersRepository();
//     showUserService = new ShowUserService(fakeUsersRepository);
//   });

//   it("should show the user's profile information", async () => {
//     const role = Math.floor(Math.random() * 4);

//     const { id } = await fakeUsersRepository.create({
//       cpf: '90207045089',
//       email: 'johndoe@gmail.com',
//       fullname: 'John Doe',
//       password: '123456',
//       phone: '61999999999',
//       role,
//       active: true,
//     });

//     const user = await showUserService.execute({
//       id,
//     });

//     expect(user).toEqual(
//       expect.objectContaining({
//         cpf: '90207045089',
//         email: 'johndoe@gmail.com',
//         fullname: 'John Doe',
//         phone: '61999999999',
//         role,
//         active: true,
//       }),
//     );
//   });

//   it('should not show the profile information if user does not exist', async () => {
//     await expect(
//       showUserService.execute({
//         id: 'non-existing-user-id',
//       }),
//     ).rejects.toBeInstanceOf(AppError);
//   });
// });
