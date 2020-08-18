// import 'reflect-metadata';

// import AppError from '@shared/errors/AppError';

// import ShowUsersService from './ShowUsersService';
// import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

// let fakeUsersRepository: FakeUsersRepository;
// let showUsersService: ShowUsersService;

// describe('ShowUsers', () => {
//   beforeEach(() => {
//     fakeUsersRepository = new FakeUsersRepository();
//     showUsersService = new ShowUsersService(fakeUsersRepository);
//   });

//   it('should list all the users, minus the one requesting it', async () => {
//     const { id: firstId } = await fakeUsersRepository.create({
//       cpf: '90207045089',
//       email: 'johndoe@gmail.com',
//       fullname: 'John Doe',
//       password: '123456',
//       phone: '61999999999',
//       role: Math.floor(Math.random() * 4),
//       active: true,
//     });

//     const { id: secondId } = await fakeUsersRepository.create({
//       cpf: '60470393084',
//       email: 'johntre@gmail.com',
//       fullname: 'John Tré',
//       password: '123456',
//       phone: '61999999999',
//       role: Math.floor(Math.random() * 4),
//       active: true,
//     });

//     const user = await fakeUsersRepository.create({
//       cpf: '42498355022',
//       email: 'johnadmin@gmail.com',
//       fullname: 'John Admin',
//       password: '123456',
//       phone: '61999999999',
//       role: 0,
//       active: true,
//     });

//     const users = await showUsersService.execute({
//       user_id: user.id,
//     });

//     expect(users.length).toEqual(2);
//     expect(users).toEqual(
//       expect.arrayContaining([
//         expect.objectContaining({
//           id: firstId,
//         }),
//         expect.objectContaining({
//           id: secondId,
//         }),
//       ]),
//     );
//   });

//   it('should not list the users if the requester doest not exist', async () => {
//     await expect(
//       showUsersService.execute({
//         user_id: 'non-existing-user',
//       }),
//     ).rejects.toBeInstanceOf(AppError);
//   });

//   it('should not list all the users if the requester is not an Admin', async () => {
//     await fakeUsersRepository.create({
//       cpf: '90207045089',
//       email: 'johndoe@gmail.com',
//       fullname: 'John Doe',
//       password: '123456',
//       phone: '61999999999',
//       role: Math.floor(Math.random() * 4),
//       active: true,
//     });

//     await fakeUsersRepository.create({
//       cpf: '60470393084',
//       email: 'johntre@gmail.com',
//       fullname: 'John Tré',
//       password: '123456',
//       phone: '61999999999',
//       role: Math.floor(Math.random() * 4),
//       active: true,
//     });

//     const user = await fakeUsersRepository.create({
//       cpf: '42498355022',
//       email: 'johnadmin@gmail.com',
//       fullname: 'John Admin',
//       password: '123456',
//       phone: '61999999999',
//       role: Math.floor(Math.random() * 3 + 1),
//       active: true,
//     });

//     await expect(
//       showUsersService.execute({
//         user_id: user.id,
//       }),
//     ).rejects.toBeInstanceOf(AppError);
//   });
// });
