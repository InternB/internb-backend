export default interface ICreateUserDTO {
  cpf: string;
  email: string;
  fullname: string;
  phone: string;
  password: string;
  role: number;
  active: boolean;
}
