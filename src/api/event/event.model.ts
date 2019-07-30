import { Schema, model, Document } from "mongoose";

// Receive these props from user
export interface IEventInput {
  title: string;
  description: string;
  price: number;
}

// Auto generate these props
export interface IEvent extends IEventInput {
  _id: any;
  date: string | number;
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
    type: Date
  }
});

export const Event = model<IEventDoc>("Event", eventSchema);
