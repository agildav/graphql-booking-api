import { Schema, model, Document } from "mongoose";

// Receive these props from user
export interface IUserInput {
  email: string;
  password: string;
  username?: string;
}

// Auto generate these props
export interface IUser extends IUserInput {
  _id: any;
  createdAt: string;
  createdEvents?: Schema.Types.ObjectId[];
}

export interface IUserDoc extends IUser, Document {}

const userSchema = new Schema({
  email: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  },
  username: {
    type: String
  },
  createdEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event"
    }
  ],
  createdAt: {
    required: true,
    type: String
  }
});

export const User = model<IUserDoc>("User", userSchema);
