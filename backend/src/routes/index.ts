import { Router } from "express";
import { ValidateToken } from "./validateToken";
import { userRoutes } from "./user.routes";
import { mqttRoutes } from "./mqtt.routes";
import { readingsRoutes } from "./readings.routes";
import { authRoutes } from "./auth.routes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/auth", authRoutes);
routes.use("/mqtt", ValidateToken, mqttRoutes);
routes.use("/readings", readingsRoutes);
routes.use("/devices", ValidateToken, readingsRoutes);

export { routes };
