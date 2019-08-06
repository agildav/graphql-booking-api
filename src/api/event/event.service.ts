import { IEventInput, Event, IEvent } from "./event.model";
import { User } from "../user/user.model";
import { getUserById } from "../user/user.service";
import { Types } from "mongoose";

/** getEvents finds all the event */
export async function getEvents(): Promise<IEvent[]> {
  try {
    const events = await Event.find();
    return events.map(event => {
      return parseEvent(event);
    });
  } catch (err) {
    console.log("error, could not find events -> ", err);
    return err;
  }
}

/** getEventsByIds finds all the event by ids */
export async function getEventsByIds(
  ids: Types.ObjectId[] | IEvent[]
): Promise<IEvent[]> {
  try {
    const events = await Event.find({ _id: { $in: ids } });
    return events.map(event => {
      return parseEvent(event);
    });
  } catch (err) {
    console.log("error, could not find events -> ", err);
    return err;
  }
}

/** getEventById finds a single event by id */
export async function getEventById(
  id: Types.ObjectId | IEvent | string
): Promise<IEvent> {
  try {
    const event = await Event.findOne({ _id: id });
    return parseEvent(event);
  } catch (err) {
    console.log("error, could not find events -> ", err);
    return err;
  }
}

/** createEvent creates a new event */
export async function createEvent(req: {
  eventInput: IEventInput;
}): Promise<IEvent> {
  try {
    // TODO: Get from headers
    const creatorId = Types.ObjectId.createFromHexString(
      "5d47041776fd06350469db27"
    );

    const creator = await User.findById(creatorId);
    if (!creator) {
      throw new Error("user not found");
    }

    const newEvent = new Event({
      title: req.eventInput.title,
      description: req.eventInput.description,
      price: req.eventInput.price,
      date: new Date().toISOString(),
      creator: creatorId
    });

    const r = await newEvent.save();

    creator.createdEvents.push(r.id);
    await creator.save();

    return parseEvent(r);
  } catch (err) {
    console.log("error, could not create event -> ", err);
    return err;
  }
}

/** parseEvent parses an event */
function parseEvent(event: IEvent): IEvent {
  return {
    ...event._doc,
    _id: event.id,
    date: new Date(event.date).toISOString(),
    creator: getUserById.bind(this, event.creator)
  };
}
