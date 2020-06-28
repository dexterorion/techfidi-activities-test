const request = require("supertest");
const app = require("..//app");

describe("Test the healthcheck", () => {
  test("It should response the GET method", done => {
    request(app)
      .get("/api/healthcheck")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});