import { Router } from "express";
import { validateToken } from "./validateToken";
import { userRoutes } from "./user.routes";
import { actuationRoutes } from "./actuation.routes";
import { readingsRoutes } from "./readings.routes";
import { devicesRoutes } from "./devices.routes";
import { greenhousesRoutes } from "./greenhouses.routes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/actuation", validateToken, actuationRoutes);
routes.use("/readings", validateToken, readingsRoutes);
routes.use("/devices", validateToken, devicesRoutes);
routes.use("/greenhouses", validateToken, greenhousesRoutes);

export { routes };
