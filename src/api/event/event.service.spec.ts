import * as EventService from "./event.service";
import * as mocks from "./event.mocks.spec";

beforeAll(() => {
  mocks.mockFind();
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
});
