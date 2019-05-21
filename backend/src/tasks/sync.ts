import db from "../config/db";
import fetchData from "../services/news/tasks";
import dotenv from "dotenv";

dotenv.config();

db.setup();

const timeout = async (ms: number) => {
  await new Promise(resolve => setTimeout(() => resolve(), ms));
};

fetchData(
  () => {
    timeout(5000).then(() => {
      console.log("Done");
      process.exit(0);
    });
  },
  () => {
    console.error("Fails");
    process.exit(1);
  }
);
