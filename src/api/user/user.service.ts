import { IUserInput, User, IUser } from "./user.model";
import { hash } from "bcryptjs";
import { IEvent } from "../event/event.model";
import { findEventsByIds } from "../event/event.service";
import { Types } from "mongoose";

/** getUsers finds all the users and events associated with them */
export async function getUsers(): Promise<any> {
  try {
    const users = await findUsers();

    return users.map(async user => {
      try {
        const events: IEvent[] = await findEventsByIds(user.createdEvents);
        user.createdEvents = events;

        return user;
      } catch (error) {
        throw error;
      }
    });
  } catch (err) {
    console.log("error, could not find users -> ", err);
    return err;
  }
}

/** getUsersByIds finds all the users by id and events associated with them */
export async function getUsersByIds(
  ids: Types.ObjectId[] | IUser[]
): Promise<any> {
  try {
    const users = await findUsersByIds(ids);
    return users.map(async user => {
      try {
        const events: IEvent[] = await findEventsByIds(user.createdEvents);
        user.createdEvents = events;
        return user;
      } catch (error) {
        throw error;
      }
    });
  } catch (err) {
    console.log("error, could not find users -> ", err);
    return err;
  }
}

/** getUserById finds the user by id and events associated with him */
export async function getUserById(id: Types.ObjectId | IUser): Promise<any> {
  try {
    const user = await findUserById(id);

    try {
      const events: IEvent[] = await findEventsByIds(user.createdEvents);
      user.createdEvents = events;

      return slimUser(user);
    } catch (error) {
      throw error;
    }
  } catch (err) {
    console.log("error, could not find user -> ", err);
    return err;
  }
}

/** createUser creates a new user */
export async function createUser(req: {
  userInput: IUserInput;
}): Promise<string> {
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
    return r._id;
  } catch (err) {
    console.log("error, could not create user -> ", err);
    return err;
  }
}

/** slimUser hides the password from a user and makes dates human-readable */
function slimUser(user: IUser): IUser {
  user.password = null;
  user.createdAt = new Date(user.createdAt).toISOString();
  return user;
}

/** findUsers finds users but does not search for their events */
export async function findUsers(): Promise<IUser[]> {
  try {
    const users = await User.find();
    return users.map(user => {
      return slimUser(user);
    });
  } catch (error) {
    throw error;
  }
}

/** findUsersByIds finds users by ids but does not search for their events */
export async function findUsersByIds(
  ids: Types.ObjectId[] | IUser[] | string
): Promise<IUser[]> {
  try {
    const users = await User.find({ _id: { $in: ids } });
    return users.map(user => {
      return slimUser(user);
    });
  } catch (error) {
    throw error;
  }
}

/** findUserById finds a single user but does not search for his events */
export async function findUserById(
  id: Types.ObjectId | IUser | string
): Promise<IUser> {
  try {
    const user = await User.findOne({ _id: id });
    return slimUser(user);
  } catch (error) {
    throw error;
  }
}
