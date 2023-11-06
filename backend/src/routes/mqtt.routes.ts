import { Router } from "express";
import { SendTestMessageController } from "../modules/mqtt/useCases/sendTestMessage/SendTestMessageController";

const sendTestMessageController = new SendTestMessageController();

const mqttRoutes = Router();

mqttRoutes.post("/test", sendTestMessageController.handle);

export { mqttRoutes };
