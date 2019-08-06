import { hash } from "bcryptjs";
import { IUserInput, User, IUser } from "./user.model";
import { getEventsByIds } from "../event/event.service";
import { Types } from "mongoose";

/** getUsers finds all the users */
export async function getUsers(): Promise<IUser[]> {
  try {
    const users = await User.find();
    return users.map(user => {
      return parseUser(user);
    });
  } catch (err) {
    console.log("error, could not find users -> ", err);
    return err;
  }
}

/** getUsersByIds finds all the users by ids */
export async function getUsersByIds(
  ids: string | Types.ObjectId[] | IUser[]
): Promise<IUser[]> {
  try {
    const users = await User.find({ _id: { $in: ids } });
    return users.map(user => {
      return parseUser(user);
    });
  } catch (err) {
    console.log("error, could not find users -> ", err);
    return err;
  }
}

/** getUserById finds the user by id */
export async function getUserById(
  id: string | Types.ObjectId | IUser
): Promise<IUser> {
  try {
    const user = await User.findOne({ _id: id });
    return parseUser(user);
  } catch (err) {
    console.log("error, could not find user -> ", err);
    return err;
  }
}

/** createUser creates a new user */
export async function createUser(req: {
  userInput: IUserInput;
}): Promise<IUser> {
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
    return parseUser(r);
  } catch (err) {
    console.log("error, could not create user -> ", err);
    return err;
  }
}

/** parseUser parses a user */
function parseUser(user: IUser): IUser {
  return {
    ...user._doc,
    _id: user.id,
    password: null,
    createdAt: new Date(user.createdAt).toISOString(),
    createdEvents: getEventsByIds.bind(this, user.createdEvents)
  };
}
