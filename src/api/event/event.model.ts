import { Schema, model, Document, Types } from "mongoose";
import { IUser } from "../user/user.model";

// Receive these props from user
export interface IEventInput {
  title: string;
  description: string;
  price: number;
}

// Auto generate these props
export interface IEvent extends IEventInput {
  _id: any;
  date: string;
  creator: Types.ObjectId | IUser | string;
}

export interface IEventDoc extends IEvent, Document {}

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

export const Event = model<IEventDoc>("Event", eventSchema);
