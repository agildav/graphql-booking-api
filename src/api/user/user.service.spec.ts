import * as mocks from "./user.mocks.spec";
import * as EventMocks from "../event/event.mocks.spec";
import UserService from "./user.service";

beforeAll(() => {
  mocks.mockFind();
  mocks.mockSave();
  EventMocks.mockFind();
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe("User service", () => {
  it("gets users", async () => {
    expect.assertions(1);

    const qtyUsers = 3;
    const response = await UserService.getUsers();

    expect(response).toHaveLength(qtyUsers);
  });

  it("creates a user", async () => {
    expect.assertions(1);
    const mockFindOne = mocks.mockFindOneNotExisting();

    const response = await UserService.createUser({
      userInput: {
        email: "test user email",
        password: "test user password",
        username: "test user username"
      }
    });

    expect(response).toBeTruthy();
    mockFindOne.mockRestore();
  });

  it("does not create an existing user", async () => {
    expect.assertions(1);
    const mockFindOne = mocks.mockFindOneExisting();

    const response = await UserService.createUser({
      userInput: {
        email: "test user email",
        password: "test user password",
        username: "test user username"
      }
    });

    expect(response).toStrictEqual(new Error("user already exists"));
    mockFindOne.mockRestore();
  });
});
