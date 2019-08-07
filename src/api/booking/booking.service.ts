import { Booking, IBooking } from "./booking.model";
import { Types } from "mongoose";
import { IEvent } from "../event/event.model";
import EventService from "../event/event.service";
import UserService from "../user/user.service";

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
  static async getBookings(): Promise<IBooking[]> {
    try {
      const bookings = await Booking.find();
      return bookings.map(booking => {
        return BookingService.parseBooking(booking);
      });
    } catch (error) {
      console.log("error, could not find bookings -> ", error);

      return error;
    }
  }

  /** bookEvent books an event */
  static async bookEvent(req: {
    eventId: Types.ObjectId | IEvent | string;
  }): Promise<IBooking> {
    try {
      // TODO: Avoid booking existing
      const event = await EventService.getEventById(req.eventId);
      const date = new Date().toISOString();

      // TODO: Change this
      const booking = new Booking({
        user: "5d47041776fd06350469db27",
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
  static async cancelBooking(req: {
    bookingId: string | Types.ObjectId | IEvent;
  }): Promise<IEvent> {
    try {
      const booking = await Booking.findOne({ _id: req.bookingId });

      const eventId = booking.event;
      const event = await EventService.getEventById(eventId);

      await Booking.deleteOne({ _id: req.bookingId });

      return event;
    } catch (error) {
      console.log("error, could not cancel booking", error);
      return error;
    }
  }
}
