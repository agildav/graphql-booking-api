import { IUserDoc, IUserInput, User } from "./user.model";
import bcrypt from "bcryptjs";

export async function getUsers(): Promise<IUserDoc[]> {
  try {
    const users = await User.find();
    return users;
  } catch (err) {
    console.log("error, could not find users -> ", err);
    return err;
  }
}

export async function createUser(req: {
  userInput: IUserInput;
}): Promise<string> {
  try {
    const foundUser = await User.findOne({ email: req.userInput.email });
    if (foundUser) {
      throw new Error("user already exists");
    }

    const hashedPassword = await bcrypt.hash(req.userInput.password, 12);
    const newUser = new User({
      email: req.userInput.email,
      password: hashedPassword,
      username: req.userInput.username,
      createdAt: new Date().toISOString()
    });

    const r = await newUser.save();
    return r._id;
  } catch (err) {
    console.log("error, could not create user -> ", err);
    return err;
  }
}
// TODO: Created events
