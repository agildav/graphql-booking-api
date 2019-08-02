import { Event } from "./event.model";

// TODO: Creator
export function mockFind() {
  const mock = jest.spyOn(Event, "find");
  mock.mockImplementation(
    (): any =>
      new Promise(resolve => {
        resolve([
          {
            _id: Math.random().toString(),
            title: "mock title one",
            description: "mock description one",
            price: Math.random(),
            date: new Date().toISOString()
          },
          {
            _id: Math.random().toString(),
            title: "mock title two",
            description: "mock description two",
            price: Math.random(),
            date: new Date().toISOString()
          },
          {
            _id: Math.random().toString(),
            title: "mock title three",
            description: "mock description three",
            price: Math.random(),
            date: new Date().toISOString()
          }
        ]);
      })
  );
  return mock;
}

export function mockSave() {
  const mock = jest.spyOn(Event.prototype, "save");
  mock.mockImplementation(
    (): any =>
      new Promise(resolve => {
        resolve({
          _id: Math.random().toString()
        });
      })
  );
  return mock;
}
