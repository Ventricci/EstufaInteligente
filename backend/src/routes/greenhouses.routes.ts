import { Router } from "express";
import { CreateGreenhouseController } from "../modules/greenhouses/useCases/createGreenhouse/CreateGreenhouseController";
import { ListGreenhousesController } from "../modules/greenhouses/useCases/listGreenhouses/ListGreenhousesController";
import { GetGreenhouseController } from "../modules/greenhouses/useCases/getGreenhouse/GetGreenhouseController";

const listGreenhousesController = new ListGreenhousesController();
const getGreenhouseController = new GetGreenhouseController();
const createGreenhouseController = new CreateGreenhouseController();

const greenhousesRoutes = Router();

greenhousesRoutes.get("/listGreenhouses", listGreenhousesController.handle);
greenhousesRoutes.get("/:greenhouseId", getGreenhouseController.handle);
greenhousesRoutes.post("/create", createGreenhouseController.handle);

export { greenhousesRoutes };
