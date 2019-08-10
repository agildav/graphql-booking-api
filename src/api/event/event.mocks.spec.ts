import { Event } from "./event.model";
import EventService from "./event.service";
import { generateRandomID } from "../../shared/random";

/** Mock for finding events */
export function mockFind() {
  const mock = jest.spyOn(Event, "find");
  mock.mockImplementation(
    (): any =>
      new Promise(resolve => {
        resolve([
          {
            _id: generateRandomID(24),
            title: "mock title one",
            description: "mock description one",
            price: Math.random(),
            date: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            creator: generateRandomID(24)
          },
          {
            _id: generateRandomID(24),
            title: "mock title two",
            description: "mock description two",
            price: Math.random(),
            date: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            creator: generateRandomID(24)
          },
          {
            _id: generateRandomID(24),
            title: "mock title three",
            description: "mock description three",
            price: Math.random(),
            date: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            creator: generateRandomID(24)
          }
        ]);
      })
  );
  return mock;
}

/** Mock for saving an event */
export function mockSave() {
  const mock = jest.spyOn(Event.prototype, "save");
  mock.mockImplementation(
    (): any =>
      new Promise(resolve => {
        resolve({
          _id: generateRandomID(24),
          title: "mock title save",
          description: "mock description save",
          price: Math.random(),
          date: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          creator: generateRandomID(24)
        });
      })
  );
  return mock;
}

/** Mock for adding an event to a user */
export function mockPushEventToCreator() {
  const mock = jest.spyOn(EventService, "pushEventToCreator");
  mock.mockImplementation(
    (): any =>
      new Promise(resolve => {
        resolve({
          _id: generateRandomID(24),
          email: "mock email two",
          password: "mock password two",
          username: "mock username two",
          createdAt: new Date().toISOString(),
          createdEvents: [generateRandomID(24)]
        });
      })
  );

  return mock;
}
