export interface CreateUserDTO {
  name: string;
  cpf: string;
  email: string;
  pass: string;
  role: "Administrator" | "Client";
}
