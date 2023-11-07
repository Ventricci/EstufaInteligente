import { Users_Role } from "@prisma/client";

export interface CreateUserDTO {
  name: string;
  cpf: string;
  email: string;
  pass: string;
  role: Users_Role;
  cep: string;
  street: string;
  houseNumber: number;
  district: string;
  city: string;
  state: string;
  adjunct: string;
}

export interface AuthenticateUserDTO {
  email: string;
  pass: string;
}
