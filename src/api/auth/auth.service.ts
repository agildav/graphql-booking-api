import { compare } from "bcryptjs";
import {
  IAuth,
  IAuthInput,
  IAuthMiddleware,
  IAuthByToken,
  IAuthAtRedis
} from "./auth.model";
import { User, IUser } from "../user/user.model";
import { sign, verify } from "jsonwebtoken";
import Redis from "../../setup/redis";

/** Auth service */
export default class AuthService {
  private static tokenExpiration: string = "24h";

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
  private static createToken(user: IUser): string {
    const token = sign(
      {
        userId: user.id,
        email: user.email
      },
      process.env.TOKEN_SECRET_KEY,
      {
        expiresIn: AuthService.tokenExpiration
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

    let userData: string;
    // Check on redis
    return AuthService.searchToken(token)
      .then((data: string) => {
        userData = data;

        if (!userData) {
          req.isAuth = false;
          return next();
        }

        // User is authenticated, pass
        req.isAuth = true;
        req.userId = decodedToken.userId;

        return next();
      })
      .catch(err => {
        req.isAuth = false;
        return next();
      });
  }

  /** login signs in a user and sets tokens */
  static async login(req: { authInput: IAuthInput }): Promise<IAuth> {
    try {
      const user = await AuthService.validateCredentials(req);

      const token = AuthService.createToken(user);

      const storeAuth: IAuthAtRedis = {
        userId: user.id,
        email: user.email
      };

      await AuthService.saveToken(token, JSON.stringify(storeAuth));

      const auth: IAuth = {
        userId: user.id,
        token,
        tokenExpiration: AuthService.tokenExpiration,
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

      const userData: IAuthAtRedis = JSON.parse(
        await AuthService.searchToken(req.tokenInput.token)
      );
      if (!userData) {
        throw new Error("an error occured searching for token");
      }

      const authUser: IAuthByToken = {
        userId: userData.userId,
        token: req.tokenInput.token,
        tokenExpiration: AuthService.tokenExpiration,
        lastChecked: new Date().toISOString(),
        email: userData.email
      };

      return authUser;
    } catch (error) {
      console.log("error, could not authenticate user by token -> ", error);
      return error;
    }
  }

  private static saveToken = (key: string, value: string): Promise<any> => {
    const redis = Redis.getRedisClient();
    return new Promise((resolve, reject) => {
      redis.set(key, value, (err, res) => {
        if (err != null) {
          return reject(err);
        }

        return resolve(res);
      });
    });
  };

  private static searchToken = (key: string): Promise<any> => {
    const redis = Redis.getRedisClient();

    return new Promise((resolve, reject) => {
      redis.get(key, (err, response) => {
        if (err != null) {
          return reject(err);
        }
        return resolve(response);
      });
    });
  };

  // TODO: Logout -> remove token from redis
}
