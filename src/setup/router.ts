import { Application } from "express";
import Graphql from "./graphql";

export async function init(app: Application): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(":: Router, starting");

      await new Graphql().graphqlInit(app);

      console.log(":: Router, ready");
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}
