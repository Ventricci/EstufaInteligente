export interface CreateUserDTO {
  name: string;
  cpf: string;
  email: string;
  pass: string;
  role: "Administrator" | "Client";
}

export interface AuthenticateUserDTO {
  email: string;
  pass: string;
}
