import request from "request";
import { Story } from "./models";

interface IStory {
  story_id: number;
  objectID: string;
  title: string;
  story_title: string;
  author: string;
  story_url: string;
  url: string;
  created_at_i: number;
  created_at: Date;
}

const fetchData = (onComplete?: any, onError?: any) => {
  const url = "https://hn.algolia.com/api/v1/search_by_date?query=nodejs";
  let count = 0;
  let hits = 0;
  let req = request
    .get(url, { json: true }, (error, response, body) => {
      hits = body.hits.length;
      body.hits.forEach((e: IStory) => {
        const {
          story_id,
          objectID,
          title,
          story_title,
          author,
          story_url,
          url,
          created_at_i,
          created_at
        } = e;
        const story = {
          story_id,
          objectID,
          title,
          story_title,
          author,
          story_url,
          url,
          created_at,
          created_at_i: created_at_i * 1000
        };
        let result = Story.updateOne(
          { objectID: objectID },
          story,
          { upsert: true },
          (err, raw) => {}
        );
      });
    })
    .on("complete", () => {
      if (onComplete) {
        onComplete();
      }
    })
    .on("error", (err: Error) => {
      console.error("Sync fails");
      if (onError) {
        onError();
      }
    });
  return req;
};

export default fetchData;
