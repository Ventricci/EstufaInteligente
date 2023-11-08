import { Router } from "express";
import { CreateGreenhouseController } from "../modules/greenhouses/useCases/createGreenhouse/CreateGreenhouseController";
import { ListGreenhousesController } from "../modules/greenhouses/useCases/listGreenhouses/ListGreenhousesController";

const createGreenhouseController = new CreateGreenhouseController();
const listGreenhouseController = new ListGreenhousesController();

const greenhouseRoutes = Router();

greenhouseRoutes.get("/greenhouse", listGreenhouseController.handle);
greenhouseRoutes.post("/greenhouse", createGreenhouseController.handle);
