const request = require("supertest");
const app = require("..//app");
const models = require('../models');

beforeAll(() => {
    process.env.NODE_ENV = 'test';
    models.Activity.destroy({
      where: {},
      truncate: true
    })
})

describe("Creating actitivity", () => {
  test("error creating activity: wrong request - nothing sent", done => {
    request(app)
      .post("/api/activities")
      .send({})
      .then(response => {
        expect(response.statusCode).toBe(422);
        expect(response.body).toStrictEqual({"error":[{"location":"body","msg":"Invalid value","param":"title"},{"location":"body","msg":"Invalid value","param":"title"},{"location":"body","msg":"Invalid value","param":"description"},{"location":"body","msg":"Invalid value","param":"description"},{"location":"body","msg":"Invalid value","param":"status"}]})
        done();
      });
  });
  test("error creating activity: wrong request - only title sent", done => {
    request(app)
      .post("/api/activities")
      .send({title: "The Jest Test"})
      .then(response => {
        expect(response.statusCode).toBe(422);
        expect(response.body).toStrictEqual({"error":[{"location":"body","msg":"Invalid value","param":"description"},{"location":"body","msg":"Invalid value","param":"description"},{"location":"body","msg":"Invalid value","param":"status"}]})
        done();
      });
  });
  test("error creating activity: wrong request - only description and title sent", done => {
    request(app)
      .post("/api/activities")
      .send({title: "The Jest Test", description: "I am writing a Jest Test"})
      .then(response => {
        expect(response.statusCode).toBe(422);
        expect(response.body).toStrictEqual({"error":[{"location":"body","msg":"Invalid value","param":"status"}]})
        done();
      });
  });
  test("error creating activity: wrong request - wrong status", done => {
    request(app)
      .post("/api/activities")
      .send({title: "The Jest Test", description: "I am writing a Jest Test", status: "ABC"})
      .then(response => {
        expect(response.statusCode).toBe(422);
        expect(response.body).toStrictEqual({"error":[{"location":"body","msg":"Invalid value","param":"status","value":"ABC"}]})
        done();
      });
  });
  test("all ok", done => {
    request(app)
      .post("/api/activities")
      .send({title: "The Jest Test", description: "I am writing a Jest Test", status: "Pending"})
      .then(response => {
        expect(response.statusCode).toBe(201);
        expect(response.body.data.id).toBe(1)
        done();
      });
  });
});

describe("Listing activity", () => {
  test("all ok with creating", done => {
    request(app)
      .post("/api/activities")
      .send({title: "The Jest Test", description: "I am writing a Jest Test", status: "Pending"})
      .then(response => {
        expect(response.statusCode).toBe(201);
        expect(response.body.data.id).toBe(2)
        done();
      });
  });

  test("all ok with listing", done => {
    request(app)
      .get("/api/activities")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.data[0].id).toBe(1)
        expect(response.body.data[1].id).toBe(2)
        done();
      });
  });
});

describe("Updating activity status", () => {
  test("trying to update error request", done => {
    request(app)
      .put("/api/activities/3/status")
      .then(response => {
        expect(response.statusCode).toBe(422);
        expect(response.body).toStrictEqual({"error":[{"location":"body","msg":"Invalid value","param":"status"}]});
        done();
      });
  });

  test("trying to update error request", done => {
    request(app)
      .put("/api/activities/3/status")
      .send({status: "ABC"})
      .then(response => {
        expect(response.statusCode).toBe(422);
        expect(response.body).toStrictEqual({"error":[{"location":"body","msg":"Invalid value","param":"status","value":"ABC"}]})
        done();
      });
  });

  test("trying to update but not found", done => {
    request(app)
      .put("/api/activities/3/status")
      .send({status: "Done"})
      .then(response => {
        expect(response.statusCode).toBe(201);
        expect(response.body.data).toStrictEqual([0])
        done();
      });
  });

  test("checking before update", done => {
    request(app)
      .get("/api/activities/2")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.data.status).toBe("Pending");
        done();
      });
  });

  test("trying to update and updated one", done => {
    request(app)
      .put("/api/activities/2/status")
      .send({status: "Done"})
      .then(response => {
        expect(response.statusCode).toBe(201);
        expect(response.body.data).toStrictEqual([1])
        done();
      });
  });

  test("checking it was updated properly", done => {
    request(app)
      .get("/api/activities/2")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.data.status).toBe("Done");
        done();
      });
  });
});