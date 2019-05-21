import mongoose from "mongoose";
import { Configuration } from "./interfaces";

class MongoConfig implements Configuration {
  public setup() {
    this.connect();
  }

  private connect() {
    const DB_HOST = process.env.DB_HOST;
    const DB_NAME = process.env.DB_NAME;
    const DB_USER = process.env.DB_USER;
    const DB_PASSWORD = process.env.DB_PASSWORD;

    const mongoUrl: string = `mongodb://${DB_USER}:${DB_NAME}@${DB_HOST}/${DB_PASSWORD}?authSource=admin`;

    mongoose.Promise = global.Promise;
    mongoose.set("useFindAndModify", false);
    mongoose
      .connect(mongoUrl, { useNewUrlParser: true })
      .then((value: mongoose.Mongoose) => {
        console.log("Mongo connected");
      })
      .catch(err => {
        console.log(err);
        process.exit(1);
      });
  }
}

export default new MongoConfig();
