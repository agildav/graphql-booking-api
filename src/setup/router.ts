import { Application } from "express";
import Graphql from "./graphql";
import Redis from "./redis";
import MongoDB from "./mongodb";

export async function init(app: Application): Promise<void> {
  try {
    console.log(":: Router, starting");

    const promises = [];

    // Initializers
    promises.push(
      Redis.redisInit(),
      MongoDB.mongoDbInit(),
      Graphql.graphqlInit(app)
    );

    await Promise.all(promises)
      .then(resolved => {
        console.log(":: Router, ready");
        return;
      })
      .catch(err => {
        throw err;
      });
  } catch (err) {
    throw err;
  }
}
