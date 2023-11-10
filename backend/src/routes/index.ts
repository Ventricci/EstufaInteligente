import { Router } from "express";
import { ValidateToken } from "./validateToken";
import { userRoutes } from "./user.routes";
import { actuationRoutes } from "./actuation.routes";
import { readingsRoutes } from "./readings.routes";
import { authRoutes } from "./auth.routes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/auth", authRoutes);
routes.use("/actuation", actuationRoutes); // TODO: Colocar o validate token aqui
routes.use("/readings", readingsRoutes);
routes.use("/devices", ValidateToken, readingsRoutes);

export { routes };
