import { Application } from "express";
/*
  !: Add new components here
*/
import SharksControllerInit from "../api/sharks/sharks.controller";

export function init(app: Application) {
  // db.init();

  /*
    !: Initialize new controllers here
  */

  SharksControllerInit(app);
}
