import { Event } from "./event.model";

const generateRandomID = length => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

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
            creator: generateRandomID(24)
          },
          {
            _id: generateRandomID(24),
            title: "mock title two",
            description: "mock description two",
            price: Math.random(),
            date: new Date().toISOString(),
            creator: generateRandomID(24)
          },
          {
            _id: generateRandomID(24),
            title: "mock title three",
            description: "mock description three",
            price: Math.random(),
            date: new Date().toISOString(),
            creator: generateRandomID(24)
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
          _id: generateRandomID(24)
        });
      })
  );
  return mock;
}
