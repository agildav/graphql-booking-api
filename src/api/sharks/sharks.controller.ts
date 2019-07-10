import { Request, Response, NextFunction } from "express";
import * as SharksService from "./sharks.service";

export function getShark(req: Request, res: Response, next: NextFunction) {
  const shark = SharksService.getShark();
  res.status(200).json(shark);
}
