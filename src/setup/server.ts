import express from "express";
import cors from "cors";
import morgan from "morgan";
import * as router from "./router";

export const app: express.Application = express();
console.log(":: Server, starting");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(cors());
app.use(morgan(": :method ':url' -> :status in :response-time ms"));

console.log(":: Routes, registering");
router.init(app);
console.log(":: Routes, OK");
console.log(":: Server, ready");
