import * as EventService from "./event.service";
import * as mocks from "./event.mocks.spec";

beforeAll(() => {
  mocks.mockFind();
  mocks.mockSave();
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
    expect.assertions(2);

    const response = await EventService.createEvent({
      eventInput: {
        title: "title create event test",
        description: "description create event test",
        price: Math.random()
      }
    });

    const maxValueID = 1.0;
    expect(response).toBeTruthy();
    expect(parseFloat(response)).toBeLessThan(maxValueID);
  });
});
