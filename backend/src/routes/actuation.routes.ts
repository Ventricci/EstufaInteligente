import { Router } from "express";
import { SendActuationController } from "../modules/mqtt/useCases/sendActuation/SendActuationController";
import { mqttClient } from "../server";

const sendActuationController = new SendActuationController();

const actuationRoutes = Router();

actuationRoutes.post("/:deviceId/", sendActuationController.handle);

export { actuationRoutes };
