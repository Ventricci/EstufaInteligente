import express from "express";
import { routes } from "./routes";
import { MqttHandler } from "./mqttHandler";
import dotenv from "dotenv";

dotenv.config();

export const mqttClient = new MqttHandler();
// mqttClient.connect();

const app = express();

app.use(express.json());

app.use(routes);

app.listen(process.env.PORT ? Number(process.env.PORT) : 3000, () => {
  console.log("[SERVER] Running on port 3000 🚀");
});
