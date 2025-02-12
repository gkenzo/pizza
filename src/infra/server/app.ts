import bodyParser from "body-parser";
import cors from "cors";
import express, { Application } from "express";

import { healthCheckRoute } from "../http";
import { errorHandlerMiddleware } from "../http/middlewares";

class App {
  public server: Application;
  private isProduction = false;

  constructor() {
    this.server = express();
    this.initMiddleware();
    this.initRoutes();
    this.server.use(errorHandlerMiddleware.handle);
  }

  private initMiddleware() {
    this.setupCors();
    this.server.use(bodyParser.json());
  }

  private initRoutes() {
    this.server.use(healthCheckRoute);
  }

  private setupCors() {
    this.server.use(cors({ origin: "*" }));
  }
}

export default new App().server;
