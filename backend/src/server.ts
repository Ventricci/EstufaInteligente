import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import { routes } from "./routes";
import { MqttHandler } from "./mqttHandler";
import cors from "cors";
import dotenv from "dotenv";
import { AppError } from "./errors/AppError";

dotenv.config();

const port = process.env.PORT ? Number(process.env.PORT) : 3333;

export const mqttClient = new MqttHandler();
// mqttClient.connect();

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      console.error(error);
      return response
        .status(error.statusCode)
        .json({ status: "error", message: error.message });
    }

    console.error(error);
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${error.message}`,
    });
  }
);

app.listen(port, () => {
  console.log(`[SERVER] Running on port ${port}  🚀`);
});
