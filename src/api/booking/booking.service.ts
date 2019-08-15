import { Booking, IBooking } from "./booking.model";
import { Types } from "mongoose";
import { IEvent } from "../event/event.model";
import EventService from "../event/event.service";
import UserService from "../user/user.service";

/** Booking service */
export default class BookingService {
  /** parseBooking parses a booking */
  private static parseBooking(booking: IBooking): IBooking {
    return {
      ...booking._doc,
      _id: booking.id,
      createdAt: new Date(booking.createdAt).toISOString(),
      updatedAt: new Date(booking.updatedAt).toISOString(),
      event: EventService.getEventById.bind(this, booking.event),
      user: UserService.getUserById.bind(this, booking.user)
    };
  }

  /** getBookings finds all the bookings and parses them */
  static async getBookings(userId: string): Promise<IBooking[]> {
    try {
      const bookings = await Booking.find({ user: userId });
      return bookings.map(booking => {
        return BookingService.parseBooking(booking);
      });
    } catch (error) {
      console.log("error, could not find bookings -> ", error);

      return error;
    }
  }

  /** bookEvent books an event */
  static async bookEvent(
    args: {
      eventId: Types.ObjectId | IEvent | string;
    },
    userId: string
  ): Promise<IBooking> {
    try {
      const event = await EventService.getEventById(args.eventId);
      const date = new Date().toISOString();

      const booking = new Booking({
        user: userId,
        event,
        createdAt: date,
        updatedAt: date
      });

      const r = await booking.save();

      return BookingService.parseBooking(r);
    } catch (error) {
      console.log("error, could not book event", error);
      return error;
    }
  }

  /** getBookingById finds a single booking by id and parses it */
  static async getBookingById(
    id: Types.ObjectId | IEvent | string
  ): Promise<IBooking> {
    try {
      const booking = await Booking.findOne({ _id: id });
      return BookingService.parseBooking(booking);
    } catch (err) {
      console.log("error, could not find booking -> ", err);
      return err;
    }
  }

  /** cancelBooking cancels a booking */
  static async cancelBooking(args: {
    bookingId: string | Types.ObjectId | IEvent;
  }): Promise<IEvent> {
    try {
      const booking = await Booking.findOne({ _id: args.bookingId });

      const eventId = booking.event;
      const event = await EventService.getEventById(eventId);

      await Booking.deleteOne({ _id: args.bookingId });

      return event;
    } catch (error) {
      console.log("error, could not cancel booking", error);
      return error;
    }
  }
}
