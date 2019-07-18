import { Application } from "express";
import DatabaseInit from "./db/db";
/*
  !: Add new components here
*/
import SharksControllerInit from "../api/sharks/sharks.controller";

export async function init(app: Application): Promise<any> {
  /*
    !: Initialize new controllers here
  */

  await SharksControllerInit(app);

  console.log(":: Routes, OK");
  return new Promise((resolve, reject) => {
    DatabaseInit()
      .then(status => {
        resolve(status);
      })
      .catch(err => {
        reject(err);
      });
  });
}
