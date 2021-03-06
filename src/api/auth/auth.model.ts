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
  tokenExpiration?: string;
  lastChecked?: string;
}

/** Auth model by logging in with token */
export interface IAuthByToken extends IAuth {
  email: string;
}

/** Auth model stored at Redis */
export interface IAuthAtRedis {
  email: string;
  userId: string;
}
