import { Application, Request, Response } from "express";
import { StoryController } from "./controller";

export default class Routes {
  private storyController: StoryController;

  constructor() {
    this.storyController = new StoryController();
  }

  public routes(app: Application) {
    app.route("/stories").get(this.storyController.list);

    app.route("/stories/:objectID").delete(this.storyController.delete);
  }
}
