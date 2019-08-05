import { IEventInput, Event, IEvent } from "./event.model";
import { IUser } from "../user/user.model";
import { findUserById } from "../user/user.service";
import { Types } from "mongoose";

/** getEvents finds all the event and users associated with them */
export async function getEvents(): Promise<any> {
  try {
    const events = await findEvents();

    return events.map(async event => {
      try {
        const user: IUser = await findUserById(event.creator);
        event.creator = user;

        return event;
      } catch (err) {
        throw err;
      }
    });
  } catch (err) {
    console.log("error, could not find events -> ", err);
    return err;
  }
}

/** getEventsByIds finds all the event by ids and users associated with them */
export async function getEventsByIds(
  ids: Types.ObjectId[] | IEvent[]
): Promise<any> {
  try {
    const events = await Event.find({ _id: { $in: ids } });

    return events.map(async event => {
      try {
        const user: IUser = await findUserById(event.creator);
        event.creator = user;

        return event;
      } catch (err) {
        throw err;
      }
    });
  } catch (err) {
    console.log("error, could not find events -> ", err);
    return err;
  }
}

/** getEventById finds a single event by id and users associated with them */
export async function getEventById(id: Types.ObjectId | IEvent): Promise<any> {
  try {
    const event = await Event.findOne({ _id: id });

    try {
      const user: IUser = await findUserById(event.creator);
      event.creator = user;

      return event;
    } catch (err) {
      throw err;
    }
  } catch (err) {
    console.log("error, could not find events -> ", err);
    return err;
  }
}

/** createEvent creates a new event */
export async function createEvent(req: {
  eventInput: IEventInput;
}): Promise<string> {
  try {
    // TODO: Get from headers
    const creatorID = Types.ObjectId.createFromHexString(
      "5d47041776fd06350469db27"
    );

    if (!Types.ObjectId.isValid(creatorID)) {
      throw new Error("invalid user id");
    }

    const newEvent = new Event({
      title: req.eventInput.title,
      description: req.eventInput.description,
      price: req.eventInput.price,
      date: new Date().toISOString(),
      creator: creatorID
    });

    const r = await newEvent.save();
    return r._id;
  } catch (err) {
    console.log("error, could not create event -> ", err);
    return err;
  }
}

/** slimEvent makes dates human-readable */
function slimEvent(event: IEvent) {
  event.date = new Date(event.date).toISOString();
  return event;
}

/** findEvents finds events but does not search for their users */
export async function findEvents(): Promise<IEvent[]> {
  try {
    const events = await Event.find();
    return events.map(event => {
      return slimEvent(event);
    });
  } catch (error) {
    throw error;
  }
}

/** findEventsByIds finds events but does not search for their users */
export async function findEventsByIds(
  ids: Types.ObjectId[] | IEvent[] | string[]
): Promise<IEvent[]> {
  try {
    const events = await Event.find({ _id: { $in: ids } });
    return events.map(event => {
      return slimEvent(event);
    });
  } catch (error) {
    throw error;
  }
}

/** findEventById finds a single event but does not search for their users */
export async function findEventById(
  id: Types.ObjectId | IEvent | string
): Promise<IEvent> {
  try {
    const event = await Event.findOne({ _id: id });
    return slimEvent(event);
  } catch (error) {
    throw error;
  }
}
