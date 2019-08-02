import { User } from "./user.model";

// TODO: Created events
export function mockFind() {
  const mock = jest.spyOn(User, "find");
  mock.mockImplementation(
    (): any =>
      new Promise(resolve => {
        resolve([
          {
            _id: Math.random().toString(),
            email: "mock email one",
            password: "mock password one",
            username: "mock username one",
            createdAt: new Date().toISOString()
          },
          {
            _id: Math.random().toString(),
            email: "mock email two",
            password: "mock password two",
            username: "mock username two",
            createdAt: new Date().toISOString()
          },
          {
            _id: Math.random().toString(),
            email: "mock email three",
            password: "mock password three",
            username: "mock username three",
            createdAt: new Date().toISOString()
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
          _id: Math.random().toString()
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
          _id: Math.random().toString(),
          email: "mock email one",
          password: "mock password one",
          username: "mock username one",
          createdAt: new Date().toISOString()
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
