import { NextFunction, Request, Response, Router } from "express";
import { userRoutes } from "./user.routes";
import { mqttRoutes } from "./mqtt.routes";
import { readingsRoutes } from "./readings.routes";
import { authRoutes } from "./auth.routes";
import jwt from "jsonwebtoken";

const routes = Router();

const VerifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res
      .status(401)
      .json({ auth: false, errorMessage: "É necessário um token de acesso" });
  }

  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      return res
        .status(401)
        .json({
          auth: false,
          errorMessage: "Houve um erro ao validar o token",
        });
    }

    // Verificando se decoded é um objeto e se ele possui a propriedade email
    if (typeof decoded === "object" && decoded.hasOwnProperty("email")) {
      // Se sim, então o token é válido
      req.body.email = decoded.email;
    } else {
      return res
        .status(401)
        .json({
          auth: false,
          errorMessage: "Houve um erro ao validar o token",
        });
    }
    next();
  });
};

routes.use("/users", userRoutes);
routes.use("/mqtt", mqttRoutes);
routes.use("/readings", readingsRoutes); // TODO: routes.use("/readings", VerifyToken, readingsRoutes);
routes.use("/auth", authRoutes);

export { routes };
