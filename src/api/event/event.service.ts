import { IEventInput, Event, IEvent } from "./event.model";
import { User, IUser } from "../user/user.model";
import { Types } from "mongoose";
import UserService from "../user/user.service";

export default class EventService {
  /** parseEvent parses an event */
  private static parseEvent(event: IEvent): IEvent {
    return {
      ...event._doc,
      _id: event.id,
      date: new Date(event.date).toISOString(),
      creator: UserService.getUserById.bind(this, event.creator)
    };
  }

  /** getEvents finds all the event and parses them */
  static async getEvents(): Promise<IEvent[]> {
    try {
      const events = await Event.find();
      return events.map(event => {
        return EventService.parseEvent(event);
      });
    } catch (err) {
      console.log("error, could not find events -> ", err);
      return err;
    }
  }

  /** getEventsByIds finds all the event by ids and parses them */
  static async getEventsByIds(
    ids: Types.ObjectId[] | IEvent[]
  ): Promise<IEvent[]> {
    try {
      const events = await Event.find({ _id: { $in: ids } });
      return events.map(event => {
        return EventService.parseEvent(event);
      });
    } catch (err) {
      console.log("error, could not find events -> ", err);
      return err;
    }
  }

  /** getEventById finds a single event by id and parses it */
  static async getEventById(
    id: Types.ObjectId | IEvent | string
  ): Promise<IEvent> {
    try {
      const event = await Event.findOne({ _id: id });
      return EventService.parseEvent(event);
    } catch (err) {
      console.log("error, could not find event -> ", err);
      return err;
    }
  }

  /** createEvent creates a new event */
  static async createEvent(req: { eventInput: IEventInput }): Promise<IEvent> {
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

      await this.pushEventToCreator(r.id, creator);

      return EventService.parseEvent(r);
    } catch (err) {
      console.log("error, could not create event -> ", err);
      return err;
    }
  }

  /** pushEventToCreator adds an event to an existing user */
  static async pushEventToCreator(
    eventId: any,
    creator: IUser
  ): Promise<IUser> {
    try {
      creator.createdEvents.push(eventId);

      return creator.save();
    } catch (error) {
      throw error;
    }
  }
}
