import express from "express";
import cors from "cors";
import * as router from "./router";

const port = process.env.PORT || 3000;

export const init = () => {
  console.log(":: Server, starting");

  const app: express.Application = express();

  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true
    })
  );
  app.use(cors());

  router
    .init(app)
    .then(() => {
      return app.listen(port, () => {
        console.log(":: Server, ready");
        return console.log(`:: Server is listening on port ${port}`);
      });
    })
    .catch(err => {
      console.log("ERROR starting server -> ", err);
      return;
    });
};
