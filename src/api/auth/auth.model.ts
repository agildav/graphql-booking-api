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
