import { Router } from "express";

import { healthCheckController } from ".";

const healthCheckRoute = Router();

healthCheckRoute.get("/v1/health-check", healthCheckController.handle);

export { healthCheckRoute };
