import { User } from "./user.model";

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
  const mock = jest.spyOn(User, "find");
  mock.mockImplementation(
    (): any =>
      new Promise(resolve => {
        resolve([
          {
            _id: generateRandomID(24),
            email: "mock email one",
            password: "mock password one",
            username: "mock username one",
            createdAt: new Date().toISOString(),
            createdEvents: [
              generateRandomID(24),
              generateRandomID(24),
              generateRandomID(24)
            ]
          },
          {
            _id: generateRandomID(24),
            email: "mock email two",
            password: "mock password two",
            username: "mock username two",
            createdAt: new Date().toISOString(),
            createdEvents: [generateRandomID(24)]
          },
          {
            _id: generateRandomID(24),
            email: "mock email three",
            password: "mock password three",
            username: "mock username three",
            createdAt: new Date().toISOString(),
            createdEvents: []
          }
        ]);
      })
  );
  return mock;
}

export function mockSave() {
  const mock = jest.spyOn(User.prototype, "save");
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

export function mockFindOneExisting() {
  const mock = jest.spyOn(User, "findOne");
  mock.mockImplementation(
    (): any =>
      new Promise(resolve => {
        resolve({
          _id: generateRandomID(24),
          email: "mock email one",
          password: "mock password one",
          username: "mock username one",
          createdAt: new Date().toISOString(),
          createdEvents: [
            generateRandomID(24),
            generateRandomID(24),
            generateRandomID(24)
          ]
        });
      })
  );
  return mock;
}

export function mockFindOneNotExisting() {
  const mock = jest.spyOn(User, "findOne");
  mock.mockImplementation(
    (): any =>
      new Promise(resolve => {
        resolve(false);
      })
  );
  return mock;
}

export function mockFindById() {
  const mock = jest.spyOn(User, "findById");
  mock.mockImplementation(
    (): any =>
      new Promise(resolve => {
        resolve(false);
      })
  );
  return mock;
}
