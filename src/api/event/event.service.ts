import { IEventInput, Event, IEvent } from "./event.model";

export async function getEvents(): Promise<IEvent[]> {
  try {
    const events = await Event.find();
    return events.map(event => {
      event.date = new Date(event.date).toISOString();

      return event;
    });
  } catch (err) {
    console.log("error, could not find events -> ", err);
    return err;
  }
}

export async function createEvent(req: {
  eventInput: IEventInput;
}): Promise<string> {
  try {
    const newEvent = new Event({
      title: req.eventInput.title,
      description: req.eventInput.description,
      price: req.eventInput.price,
      date: new Date().toISOString()
    });

    const r = await newEvent.save();
    return r._id;
  } catch (err) {
    console.log("error, could not create event -> ", err);
    return err;
  }
}
// TODO: Creator
