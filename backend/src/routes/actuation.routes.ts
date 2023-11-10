import { Router } from "express";
import { SendActuationController } from "../modules/mqtt/useCases/sendActuation/SendActuationController";

const sendActuationController = new SendActuationController();

const actuationRoutes = Router();

actuationRoutes.post("/:deviceId", sendActuationController.handle);

export { actuationRoutes };
