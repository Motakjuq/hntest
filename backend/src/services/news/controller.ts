import { Story } from "./models";
import { Request, Response } from "express";

export class StoryController {
  public list(req: Request, resp: Response) {
    Story.find({ deleted: { $in: [undefined, false] } }, (err, story) => {
      if (err) {
        resp.send(err);
      }
      resp.json(story);
    }).sort({ created_at_i: -1 });
  }

  public delete(req: Request, resp: Response) {
    Story.findOneAndUpdate(
      { objectID: req.params.objectID, deleted: { $in: [undefined, false] } },
      { deleted: true },
      { new: true },
      (err, story) => {
        if (err) {
          resp.send(err);
        }
        if (story) {
          resp.json({ message: "deleted" });
        } else {
          resp.status(400).json({ message: "invalid id" });
        }
      }
    );
  }
}
