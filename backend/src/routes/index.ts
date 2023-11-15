import { Router } from "express";
import { ValidateToken } from "./validateToken";
import { userRoutes } from "./user.routes";
import { actuationRoutes } from "./actuation.routes";
import { readingsRoutes } from "./readings.routes";
import { devicesRoutes } from "./devices.routes";
import { greenhousesRoutes } from "./greenhouses.routes";

const routes = Router();

// TODO: Colocar validação de token nas rotas privadas

routes.use("/users", userRoutes);
routes.use("/actuation", actuationRoutes);
routes.use("/readings", readingsRoutes);
routes.use("/devices", devicesRoutes);
routes.use("/greenhouses", greenhousesRoutes);

export { routes };
