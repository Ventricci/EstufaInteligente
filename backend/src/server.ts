import express from "express";
import { routes } from "./routes";
import { MqttHandler } from "./mqttHandler";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT ? Number(process.env.PORT) : 3333;

export const mqttClient = new MqttHandler();
// mqttClient.connect();

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.listen(port, () => {
  console.log(`[SERVER] Running on port ${port}  🚀`);
});
