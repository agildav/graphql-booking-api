import express from "express";
import cors from "cors";
import morgan from "morgan";
import * as router from "./routes";

export const app: express.Application = express();
console.log(":: Starting server");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(cors());
app.use(morgan(": :method ':url' -> :status in :response-time ms"));

console.log(":: Registering routes");
router.init(app);
console.log(":: Routes registered");
