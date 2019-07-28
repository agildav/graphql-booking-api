import { Application } from "express";
import { graphqlInit } from "./graphql";

export async function init(app: Application): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(":: Starting router");
      await graphqlInit(app);

      console.log(":: Router, ready");
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}