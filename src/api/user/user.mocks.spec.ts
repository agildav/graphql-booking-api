import { User } from "./user.model";
import { generateRandomID } from "../../shared/random";

/** Mock find users */
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

/** Mock save user */
export function mockSave() {
  const mock = jest.spyOn(User.prototype, "save");
  mock.mockImplementation(
    (): any =>
      new Promise(resolve => {
        resolve({
          _id: generateRandomID(24),
          email: "mock email save",
          password: "mock password save",
          username: "mock username save",
          createdAt: new Date().toISOString(),
          createdEvents: []
        });
      })
  );
  return mock;
}

/** Mock find one existing user */
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

/** Mock find not existing user */
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
