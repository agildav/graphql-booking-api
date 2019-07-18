import express from "express";
import cors from "cors";
import morgan from "morgan";
import * as router from "./router";

const port = process.env.PORT || 3000;

export const init = () => {
  console.log(":: Starting");

  const app: express.Application = express();

  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true
    })
  );
  app.use(cors());
  app.use(morgan(": :method ':url' -> :status in :response-time ms"));

  router
    .init(app)
    .then(status => {
      console.log(status);
      console.log(":: Server, ready");

      app.listen(port, () => {
        return console.log(`:: Server is listening on port ${port}`);
      });
    })
    .catch(err => {
      console.log(err);
    });
};
