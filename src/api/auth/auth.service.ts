import { compare } from "bcryptjs";
import { IAuth, IAuthInput } from "./auth.model";
import { User, IUser } from "../user/user.model";
import { sign } from "jsonwebtoken";

// TODO: createUser() must be here

/** Auth service */
export default class AuthService {
  /** validateCredentials validates the given email and password */
  private static async validateCredentials(req: {
    authInput: IAuthInput;
  }): Promise<IUser> {
    try {
      const user: IUser = await User.findOne({ email: req.authInput.email });
      if (!user) {
        console.log(
          "error: user with this email does not exist -> ",
          req.authInput.email
        );
        throw new Error("invalid credentials");
      }

      const matchPassword: boolean = await compare(
        req.authInput.password,
        user.password
      );
      if (!matchPassword) {
        console.log(
          "error: user with this password does not match -> ",
          req.authInput.password
        );
        throw new Error("invalid credentials");
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  /** createToken creates a new JWT for a given user */
  private static createToken(user: IUser, tokenExpiration: string): string {
    const token = sign(
      {
        userId: user.id,
        email: user.email
      },
      process.env.TOKEN_SECRET_KEY,
      {
        expiresIn: tokenExpiration
      }
    );

    return token;
  }

  /** login signs in a user and sets tokens */
  static async login(req: { authInput: IAuthInput }): Promise<IAuth> {
    try {
      const user = await AuthService.validateCredentials(req);

      const tokenExpiration: string = "2h";
      const token = AuthService.createToken(user, tokenExpiration);
      const auth: IAuth = {
        userId: user.id,
        token,
        tokenExpiration,
        lastChecked: new Date().toISOString()
      };

      return auth;
    } catch (error) {
      console.log("error, could not login user -> ", error);
      return error;
    }
  }
}
