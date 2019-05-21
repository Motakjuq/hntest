import express from "express";
import Routes from "./services/news/routes";
import configurations from "./config";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

class App {
  private app: express.Application;

  constructor() {
    configurations.forEach(conf => {
      conf.setup();
    });

    this.app = express();
    this.app.use(cors());

    new Routes().routes(this.app);
  }

  public getApp(): express.Application {
    return this.app;
  }
}
const PORT = process.env.PORT || 3001;

new App().getApp().listen(PORT, () => {
  console.log(`Running server on port ${PORT}`);
});
