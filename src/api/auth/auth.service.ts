import { compare } from "bcryptjs";
import { IAuth, IAuthInput, IAuthMiddleware, IAuthByToken } from "./auth.model";
import { User, IUser } from "../user/user.model";
import { sign, verify } from "jsonwebtoken";

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
        console.log("error: user password does not match");
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

  /** validateToken checks if a user is authenticated */
  static validateToken(req: IAuthMiddleware, res, next) {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      req.isAuth = false;
      return next();
    }

    // Bearer <token>
    const token = authHeader.split(" ")[1];

    if (!token || token === "") {
      req.isAuth = false;
      return next();
    }

    let decodedToken: any;
    try {
      decodedToken = verify(token, process.env.TOKEN_SECRET_KEY);
    } catch (error) {
      req.isAuth = false;
      return next();
    }

    if (!decodedToken) {
      req.isAuth = false;
      return next();
    }

    // User is authenticated, pass
    req.isAuth = true;
    req.userId = decodedToken.userId;

    next();
  }

  /** login signs in a user and sets tokens */
  static async login(req: { authInput: IAuthInput }): Promise<IAuth> {
    try {
      // TODO: Integrate with Redis
      const user = await AuthService.validateCredentials(req);

      const tokenExpiration: string = "6h";
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

  /** login signs in a user and sets tokens */
  static async loginWithToken(req: {
    tokenInput: { token: string };
  }): Promise<IAuthByToken> {
    try {
      // TODO: Integrate with Redis
      let decodedToken: any;
      try {
        decodedToken = verify(
          req.tokenInput.token,
          process.env.TOKEN_SECRET_KEY
        );
        if (!decodedToken) {
          throw new Error("no decoded token");
        }
      } catch (error) {
        throw error;
      }

      const tokenExpiration: string = "6h";
      const authUser: IAuthByToken = {
        userId: decodedToken.userId,
        token: req.tokenInput.token,
        tokenExpiration,
        lastChecked: new Date().toISOString(),
        email: decodedToken.email
      };

      return authUser;
    } catch (error) {
      console.log("error, could not authenticate user by token -> ", error);
      return error;
    }
  }
}
