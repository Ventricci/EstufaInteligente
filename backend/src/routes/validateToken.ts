import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];

  if (!token) {
    console.log("não autorizado, pois não tem token");
    return res
      .status(401)
      .json({ auth: false, errorMessage: "É necessário um token de acesso" });
  }

  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      console.log("não autorizado, pois o token é inválido");
      return res.status(401).json({
        auth: false,
        errorMessage: "Houve um erro ao validar o token",
      });
    }

    if (typeof decoded === "object" && decoded.hasOwnProperty("cpf")) {
      req.body.cpf = decoded.cpf;
    } else {
      console.log("não autorizado, pois não tem cpf");
      return res.status(401).json({
        auth: false,
        errorMessage: "Houve um erro ao validar o token",
      });
    }
    next();
  });
};

export { validateToken };
