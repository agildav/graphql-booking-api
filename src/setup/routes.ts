import { Application } from "express";
//! Add new controllers here
import * as SharksController from "../api/sharks/sharks.controller";

export function init(app: Application) {
  //! Add new routes here

  // GET '/' -> getShark
  app.get("/", (req, res, next) => {
    SharksController.getShark(req, res, next);
  });
}
