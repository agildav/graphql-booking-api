import { Application } from "express";
import Graphql from "./graphql";

export async function init(app: Application): Promise<void> {
  try {
    console.log(":: Router, starting");

    await Graphql.graphqlInit(app);

    console.log(":: Router, ready");
    return;
  } catch (err) {
    throw err;
  }
}
