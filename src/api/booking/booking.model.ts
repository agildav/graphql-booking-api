import { Schema, model, Document, Types } from "mongoose";
import { IUser } from "../user/user.model";
import { IEvent } from "../event/event.model";

/** Booking document */
export interface IBooking extends Document {
  /** This document */
  _doc: any;
  _id: any;
  createdAt: string;
  updatedAt: string;
  event: Types.ObjectId | IEvent | string;
  user: Types.ObjectId | IUser | string;
}

const bookingSchema = new Schema({
  createdAt: {
    type: String,
    required: true
  },
  updatedAt: {
    type: String
  },
  event: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "Event"
  },
  user: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

export const Booking = model<IBooking>("Booking", bookingSchema);
