import * as mocks from "./event.mocks.spec";
import * as UserMocks from "../user/user.mocks.spec";
import EventService from "./event.service";
import { generateRandomID } from "../../shared/random";

beforeAll(() => {
  mocks.mockFind();
  mocks.mockSave();
  mocks.mockPushEventToCreator();

  UserMocks.mockFind();
  UserMocks.mockFindOneExisting();
  UserMocks.mockSave();
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe("Event service", () => {
  it("gets events", async () => {
    expect.assertions(1);

    const qtyEvents = 3;
    const response = await EventService.getEvents();

    expect(response).toHaveLength(qtyEvents);
  });

  it("creates an event", async () => {
    expect.assertions(1);

    const response = await EventService.createEvent(
      {
        eventInput: {
          title: "title create event test",
          description: "description create event test",
          price: Math.random()
        }
      },
      generateRandomID(24)
    );

    expect(response).toBeTruthy();
  });
});
