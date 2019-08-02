import * as UserService from "./user.service";
import * as mocks from "./user.mocks.spec";

beforeAll(() => {
  mocks.mockFind();
  mocks.mockSave();
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
    expect.assertions(2);
    const mockFindOne = mocks.mockFindOneNotExisting();

    const response = await UserService.createUser({
      userInput: {
        email: "test user email",
        password: "test user password",
        username: "test user username"
      }
    });

    const maxValueID = 1.0;
    expect(response).toBeTruthy();
    expect(parseFloat(response)).toBeLessThan(maxValueID);
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
