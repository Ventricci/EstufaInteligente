import { Users_Role } from "@prisma/client";

export interface CreateUserDTO {
  name: string;
  cpf: string;
  email: string;
  pass: string;
  role: Users_Role;
}

export interface AuthenticateUserDTO {
  email: string;
  pass: string;
}
