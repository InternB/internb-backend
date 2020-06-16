export default interface ICreateSchoolDTO {
  type: number;
  name: string;
  adm_region_id: string;
  cep: string;
  address: string;
  phone?: string;
  email?: string;
}
