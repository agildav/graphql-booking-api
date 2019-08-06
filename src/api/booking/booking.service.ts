import { Booking, IBooking } from "./booking.model";
import { Types } from "mongoose";
import { IEvent } from "../event/event.model";
import { getEventById } from "../event/event.service";
import { getUserById } from "../user/user.service";

/** getBookings finds all the bookings and parses them */
export async function getBookings(): Promise<IBooking[]> {
  try {
    const bookings = await Booking.find();
    return bookings.map(booking => {
      return parseBooking(booking);
    });
  } catch (error) {
    console.log("error, could not find bookings -> ", error);

    return error;
  }
}

/** bookEvent books an event */
export async function bookEvent(req: {
  eventId: Types.ObjectId | IEvent | string;
}): Promise<IBooking> {
  try {
    // TODO: Avoid booking existing
    const event = await getEventById(req.eventId);
    const date = new Date().toISOString();

    // TODO: Change this
    const booking = new Booking({
      user: "5d47041776fd06350469db27",
      event,
      createdAt: date,
      updatedAt: date
    });

    const r = await booking.save();

    return parseBooking(r);
  } catch (error) {
    console.log("error, could not book event", error);
    return error;
  }
}

/** getBookingById finds a single booking by id and parses it */
export async function getBookingById(
  id: Types.ObjectId | IEvent | string
): Promise<IBooking> {
  try {
    const booking = await Booking.findOne({ _id: id });
    return parseBooking(booking);
  } catch (err) {
    console.log("error, could not find booking -> ", err);
    return err;
  }
}

/** cancelBooking cancels a booking */
export async function cancelBooking(req: {
  bookingId: string | Types.ObjectId | IEvent;
}): Promise<IEvent> {
  try {
    const booking = await Booking.findOne({ _id: req.bookingId });

    const eventId = booking.event;
    const event = await getEventById(eventId);

    await Booking.deleteOne({ _id: req.bookingId });

    return event;
  } catch (error) {
    console.log("error, could not cancel booking", error);
    return error;
  }
}

/** parseBooking parses a booking */
function parseBooking(booking: IBooking): IBooking {
  return {
    ...booking._doc,
    _id: booking.id,
    createdAt: new Date(booking.createdAt).toISOString(),
    updatedAt: new Date(booking.updatedAt).toISOString(),
    event: getEventById.bind(this, booking.event),
    user: getUserById.bind(this, booking.user)
  };
}
