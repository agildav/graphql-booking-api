import { Request, Response, NextFunction, Application } from "express";
import { Shark } from "./sharks.model";
import * as SharksService from "./sharks.service";

export default function init(app: Application): Promise<any> {
  return new Promise((resolve, reject) => {
    /*
      !: Add new routes here
    */

    app.get("/", getShark);
    app.get("/sharks", getSharks);

    resolve();
  });
}

/*
  !: Add new handlers here
*/

export function getShark(req: Request, res: Response, next: NextFunction) {
  const shark = SharksService.findShark();
  res.status(200).json(shark);
}

export async function getSharks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const sharks: Shark[] = await SharksService.findAllSharks();
    res.status(200).json(sharks);
  } catch (e) {
    console.log(e);

    res.status(400).json({ error: "could not get sharks" });
  }
}
