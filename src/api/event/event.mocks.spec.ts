import { Event } from "./event.model";

export function mockFind() {
  const mock = jest.spyOn(Event, "find");
  mock.mockImplementation(
    (): any =>
      new Promise(resolve => {
        resolve([
          {
            _id: Math.random().toString(),
            title: "title one",
            description: "desc one",
            price: Math.random(),
            date: new Date().toISOString()
          },
          {
            _id: Math.random().toString(),
            title: "title two",
            description: "desc two",
            price: Math.random(),
            date: new Date().toISOString()
          },
          {
            _id: Math.random().toString(),
            title: "title three",
            description: "desc three",
            price: Math.random(),
            date: new Date().toISOString()
          }
        ]);
      })
  );
}
