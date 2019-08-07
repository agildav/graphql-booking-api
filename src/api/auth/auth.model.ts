import { Request } from "express";

/** Auth middleware - request interface for Express */
export interface IAuthMiddleware extends Request {
  /** is the user authenticated? */
  isAuth: boolean;
  /** current user id */
  userId: string;
}

/** Properties received by user */
export interface IAuthInput {
  email: string;
  password: string;
}

/** Auth model */
export interface IAuth {
  userId: string;
  token: string;
  tokenExpiration: string;
  lastChecked?: string;
}
