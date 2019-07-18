import { Request, Response, NextFunction, Application } from "express";
import * as SharksService from "./sharks.service";

export default function init(app: Application) {
  /*
    !: Add new routes here
  */

  app.get("/", getShark);
}

/*
  !: Add new handlers here
*/

export function getShark(req: Request, res: Response, next: NextFunction) {
  const shark = SharksService.getShark();
  res.status(200).json(shark);
}
