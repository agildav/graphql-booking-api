import express from "express";
import cors from "cors";
import { connect } from "mongoose";
import * as router from "./router";

const port = process.env.PORT || 3000;

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CLUSTER = process.env.DB_CLUSTER;
const DB_NAME = process.env.DB_NAME;

const dbURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`;

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
      console.log(":: MongoDB, starting");
      return connect(
        dbURL,
        { useNewUrlParser: true }
      )
        .then(() => {
          console.log(":: MongoDB, ready");
          return app.listen(port, () => {
            console.log(":: Server, ready");
            return console.log(`:: Server is listening on port ${port}`);
          });
        })
        .catch(err => {
          console.log("error initializing database -> ", err);
          return;
        });
    })
    .catch(err => {
      console.log("error initializing server -> ", err);
      return;
    });
};
