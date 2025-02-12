import { Router } from "express";

import { createItemController } from ".";

const itemRoutes = Router();

itemRoutes.post("/v1/item", createItemController.handle);
itemRoutes.get("/v1/item/:id", createItemController.handle);
itemRoutes.get("/v1/item", createItemController.handle);
