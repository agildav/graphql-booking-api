import { Schema, model, Document, Types } from "mongoose";
import { IUser } from "../user/user.model";

/** Properties received by user */
export interface IEventInput {
  title: string;
  description: string;
  price: number;
}

/** Event document */
export interface IEvent extends IEventInput, Document {
  /** This document */
  _doc: any;
  _id: any;
  date: string;
  creator: Types.ObjectId | IUser | string;
}

const eventSchema = new Schema({
  title: {
    required: true,
    type: String
  },
  description: {
    required: true,
    type: String
  },
  price: {
    required: true,
    type: Number
  },
  date: {
    required: true,
    type: String
  },
  creator: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

export const Event = model<IEvent>("Event", eventSchema);
