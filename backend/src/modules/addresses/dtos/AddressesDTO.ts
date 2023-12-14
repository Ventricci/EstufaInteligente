export interface ICreateAddressRequestDTO {
  user_cpf: string;
  cep: string;
  street: string;
  housenumber: number;
  district: string;
  city: string;
  state: string;
  adjunct?: string;
}
