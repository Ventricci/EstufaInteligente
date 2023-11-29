import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const ValidateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res
      .status(401)
      .json({ auth: false, errorMessage: "É necessário um token de acesso" });
  }

  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      return res.status(401).json({
        auth: false,
        errorMessage: "Houve um erro ao validar o token",
      });
    }

    if (typeof decoded === "object" && decoded.hasOwnProperty("cpf")) {
      req.body.cpf = decoded.cpf;
    } else {
      return res.status(401).json({
        auth: false,
        errorMessage: "Houve um erro ao validar o token",
      });
    }
    next();
  });
};

export { ValidateToken };
