import { Router } from "express";
import { CreateAddressController } from "../modules/addresses/useCases/createAddress/CreateAddressController";
import { ListAddressesController } from "../modules/addresses/useCases/listAddresses/ListAddressesController";

import fs from "fs";
import { IRoute } from ".";

const createAddressController = new CreateAddressController();
const listAddressesController = new ListAddressesController();

const addressesRoutes = Router();

export function listAddressesRoutes() {
  const routesList: IRoute[] = [];
  addressesRoutes.stack.forEach((r) => {
    if (r.route && r.route.path) {
      if (r.route.path === "/create") {
        routesList.push({
          method: Object.keys(r.route.methods)[0].toUpperCase(),
          path: `addresses${r.route.path}`,
          body: {
            cep: "12345678",
            street: "Rua 1",
            housenumber: 1,
            district: "Bairro 1",
            city: "Cidade 1",
            state: "Estado 1",
            adjunct: "Complemento 1",
          },
        });
      }
      routesList.push({
        method: Object.keys(r.route.methods)[0].toUpperCase(),
        path: `addresses${r.route.path}`,
      });
    }
  });

  if (!fs.existsSync("docs")) {
    fs.mkdirSync("docs");
  }
  fs.writeFileSync(
    "docs/addressesRoutes.json",
    JSON.stringify(routesList, null, 2)
  );
}

addressesRoutes.post("/create", createAddressController.handle);
addressesRoutes.get("/list", listAddressesController.handle);
