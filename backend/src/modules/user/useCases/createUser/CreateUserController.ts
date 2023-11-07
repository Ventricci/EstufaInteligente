import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { CreateUserDTO } from "../../dtos/UserDTO";
import { Users_Role } from "@prisma/client";
import { CreateAddressesDTO } from "../../../addresses/dtos/AddressesDTO";
import { CreateAddressesUseCase } from "../../../addresses/useCases/createAddresses/CreateAddressesUseCase";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const {
      name,
      cpf,
      email,
      pass,
      role = Users_Role.Client,
      cep,
      street,
      houseNumber,
      district,
      city,
      state,
      adjunct,
    } = request.body as CreateUserDTO;

    // validando se os campos estão corretos
    // name:
    if (!name || name.length > 80) {
      return response.status(400).json({
        error: "O banco de dados não aceita nomes com mais de 80 caracteres",
      });
    }
    // cpf:
    if (!cpf || cpf.length !== 11) {
      return response
        .status(400)
        .json({ errorMessage: "O tamanho do cpf deve ser de 11 caracteres" });
    }
    // email:
    const emailRegex = /\S+@\S+\.\S+/;
    if (!email || email.length > 160) {
      return response.status(400).json({
        error: "O banco de dados não aceita emails com mais de 160 caracteres",
      });
    } else if (!emailRegex.test(email)) {
      return response.status(400).json({ errorMessage: "O email é inválido" });
    }
    // pass:
    if (!pass || pass.length > 30) {
      return response.status(400).json({
        error: "O banco de dados não aceita senhas com mais de 30 caracteres",
      });
    }
    // role:
    if (role !== Users_Role.Administrator && role !== Users_Role.Client) {
      return response.status(400).json({
        errorMessage: "A função só pode ser 'Administrator' ou 'Client'",
      });
    }

    // cep:
    if (!cep || cep.length !== 8) {
      return response
        .status(400)
        .json({ errorMessage: "O tamanho do cep deve ser de 8 caracteres" });
    }
    // street:
    if (!street || street.length > 160) {
      return response.status(400).json({
        error: "O banco de dados não aceita ruas com mais de 160 caracteres",
      });
    }

    // houseNumber:
    if (!houseNumber || houseNumber < 0 || isNaN(Number(houseNumber))) {
      return response.status(400).json({
        error:
          "O banco de dados não aceita números de casas negativos ou não numéricos",
      });
    }

    // district:
    if (!district || district.length > 120) {
      return response.status(400).json({
        error: "O banco de dados não aceita bairros com mais de 120 caracteres",
      });
    }

    // city:
    if (!city || city.length > 160) {
      return response.status(400).json({
        error: "O banco de dados não aceita cidades com mais de 160 caracteres",
      });
    }

    // state:
    if (!state || state.length > 50) {
      return response.status(400).json({
        error: "O banco de dados não aceita estados com mais de 50 caracteres",
      });
    }

    // adjunct:
    if (adjunct && adjunct.length > 160) {
      return response.status(400).json({
        error:
          "O banco de dados não aceita complementos com mais de 160 caracteres",
      });
    }

    const createUserUseCase = new CreateUserUseCase();

    const result = await createUserUseCase.execute({
      name,
      cpf,
      email,
      pass,
      role,
      cep,
      street,
      houseNumber: Number(houseNumber),
      district,
      city,
      state,
      adjunct,
    });

    if ("errorMessage" in result) {
      return response.status(400).json(result);
    } else {
      return response.status(201).json(result);
    }
  }
}
