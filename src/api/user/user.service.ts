import { hash } from "bcryptjs";
import { IUserInput, User, IUser } from "./user.model";
import { Types } from "mongoose";
import EventService from "../event/event.service";

/** User service */
export default class UserService {
  /** parseUser parses a user */
  private static parseUser(user: IUser): IUser {
    return {
      ...user._doc,
      _id: user.id,
      password: null,
      createdAt: new Date(user.createdAt).toISOString(),
      createdEvents: EventService.getEventsByIds.bind(this, user.createdEvents)
    };
  }

  /** getUsers finds all the users and parses them */
  static async getUsers(): Promise<IUser[]> {
    try {
      const users = await User.find();
      return users.map(user => {
        return UserService.parseUser(user);
      });
    } catch (err) {
      console.log("error, could not find users -> ", err);
      return err;
    }
  }

  /** getUsersByIds finds all the users by ids and parses them */
  static async getUsersByIds(
    ids: string | Types.ObjectId[] | IUser[]
  ): Promise<IUser[]> {
    try {
      const users = await User.find({ _id: { $in: ids } });
      return users.map(user => {
        return UserService.parseUser(user);
      });
    } catch (err) {
      console.log("error, could not find users -> ", err);
      return err;
    }
  }

  /** getUserById finds the user by id and parses it */
  static async getUserById(
    id: string | Types.ObjectId | IUser
  ): Promise<IUser> {
    try {
      const user = await User.findOne({ _id: id });
      return UserService.parseUser(user);
    } catch (err) {
      console.log("error, could not find user -> ", err);
      return err;
    }
  }

  /** getUserByEmail finds the user by email and parses it */
  static async getUserByEmail(email: string): Promise<IUser> {
    try {
      const user = await User.findOne({ email });
      return UserService.parseUser(user);
    } catch (err) {
      console.log("error, could not find user -> ", err);
      return err;
    }
  }

  /** createUser creates a new user */
  static async createUser(req: { userInput: IUserInput }): Promise<IUser> {
    try {
      const foundUser = await User.findOne({ email: req.userInput.email });
      if (foundUser) {
        throw new Error("user already exists");
      }

      const hashedPassword = await hash(req.userInput.password, 12);
      const newUser = new User({
        email: req.userInput.email,
        password: hashedPassword,
        username: req.userInput.username,
        createdAt: new Date().toISOString(),
        createdEvents: []
      });

      const r = await newUser.save();
      return UserService.parseUser(r);
    } catch (err) {
      console.log("error, could not create user -> ", err);
      return err;
    }
  }
}
