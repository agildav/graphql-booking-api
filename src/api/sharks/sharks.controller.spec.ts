import * as SharksController from "./sharks.controller";

describe("Sharks Controller", () => {
  // prepare db
  // supertest

  it("should be defined", () => {
    expect.assertions(1);

    expect(SharksController).toBeDefined();
  });
});
