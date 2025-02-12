import bodyParser from "body-parser";
import cors from "cors";
import express, { Application } from "express";
import morgan from "morgan";

import { healthCheckRoute } from "../http";

class App {
  public server: Application;
  private isProduction = false;

  constructor() {
    this.server = express();
    this.initMiddleware();
    this.initRoutes();
  }

  private initMiddleware() {
    this.setupCors();
    this.server.use(bodyParser.json());
    this.server.use(morgan(this.isProduction ? "short" : "dev"));
  }

  private initRoutes() {
    this.server.use(healthCheckRoute);
  }

  private setupCors() {
    this.server.use(cors({ origin: "*" }));
    // this.server.use(cors({ origin: env.APP_URL.includes("localhost") ? "*" : env.APP_URL }));
  }
}

export default new App().server;
