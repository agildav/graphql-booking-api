import { Schema, model, Document } from "mongoose";

// Receive these props from user
export interface IEventInput {
  title: string;
  description: string;
  price: number;
}

// Auto generate these props
export interface IEvent extends IEventInput, Document {
  _id: string;
  date: string;
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
    type: Date
  }
});

export const Event = model<IEvent>("Event", eventSchema);
