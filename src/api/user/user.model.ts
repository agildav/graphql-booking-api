import { Schema, model, Document, Types } from "mongoose";
import { IEvent } from "../event/event.model";

/** Properties received by user */
export interface IUserInput {
  email: string;
  password: string;
  username?: string;
}

/** User document */
export interface IUser extends IUserInput, Document {
  /** This document */
  _doc: any;
  _id: any;
  createdAt: string;
  createdEvents: Types.ObjectId[] | IEvent[] | string[];
}

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
      required: true,
      type: Schema.Types.ObjectId,
      ref: "Event"
    }
  ],
  createdAt: {
    required: true,
    type: String
  }
});

export const User = model<IUser>("User", userSchema);
