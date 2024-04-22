import request from "supertest";
import {describe, expect} from "@jest/globals";

import app from "../index";
import { Users } from "../models/user";
import TimeTable from "../models/timetable";


//create user for testing
const loggedInUser = {
  username: "",
  token: ""
};

// The GET /api/timetables endpoint tests
describe("GET timetables endpoint", () => {

  beforeEach(async () => {

    const data = {
      username: "John Wayne",
      password: "john"
    };

    //check that user doesn't exist and delete if it does
    const result = await Users.findByUsername(data.username);
    if ( result ) {
      Users.deleteUserById(result._id);
    }
    //create user to database
    await request(app)
      .post("/api/users/")
      .set("Accept", "application/json")
      .send(data);

    const loginResponse = await request(app)
    .post("/api/login/")
    .set("Accept", "application/json")
    .send(data);

    loggedInUser.username = loginResponse.body.username;
    loggedInUser.token = loginResponse.body.token;
  });
  describe("GET endpoint", () => {
    describe("User doesn't have a timetable", () => {
      test("should return 404 and No timetables found", async () => {
        const response = await request(app)
          .get("/api/timetables")
          .set("Accept", "application/json")
          .set("Authorization", "Bearer " + loggedInUser.token);

        expect(response.status).toEqual(404);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.body.error).toBe("No timetables found.");
      });
    });

    describe("User has a timetable", () => {

      beforeEach(async() => {
        const user = await Users.findByUsername(loggedInUser.username);
        const codes = ["5G00EV17-3003"];
        await TimeTable.updateTimetableByUser(user?._id, codes);
      });

      it("should return 200 and valid JSON", async () => {
        const response = await request(app)
          .get("/api/timetables")
          .set("Accept", "application/json")
          .set("Authorization", "Bearer " + loggedInUser.token);

        expect(response.status).toEqual(200);
        expect(response.headers["content-type"]).toMatch(/json/);
      });

      afterEach(async () => {
        const user = await Users.findByUsername(loggedInUser.username);
        TimeTable.deleteTimetableByUser(user?._id);
      });
    });

    describe("User has a timetable", () => {
    // End and delete user that was created for testing
    test("should return course based on course code ", async() => {
      const response = await request(app)
        .get("/api/timetables/course/?code=5G00EV17-3003")
        .set("Accept", "application/json")
        .set("Authorization", "Bearer " + loggedInUser.token);

      expect(response.status).toEqual(200);
      expect(response.headers["content-type"]).toMatch(/json/);

      expect(response.body).toEqual(
        expect.objectContaining({
          status: "success"
        })
      );
    });

    test("should return 200 for unknown course code", async() => {
      const response = await request(app)
        .get("/api/timetables/course/?code=1002")
        .set("Accept", "application/json")
        .set("Authorization", "Bearer " + loggedInUser.token);

      expect(response.status).toEqual(200);
      expect(response.headers["content-type"]).toMatch(/json/);

      expect(response.body).toEqual(
        expect.objectContaining({
          status: "success",
          message: "No results",
        })
      );
    });

    test("should return courses based on class code", async() => {
      const response = await request(app)
        .get("/api/timetables/class/?code=21i224")
        .set("Accept", "application/json")
        .set("Authorization", "Bearer " + loggedInUser.token);

      expect(response.status).toEqual(200);
      expect(response.headers["content-type"]).toMatch(/json/);

      expect(response.body).toEqual(
        expect.objectContaining({
          status: "success"
        })
      );
    });

    test("should return 200 for unknown class code", async() => {
      const response = await request(app)
        .get("/api/timetables/class/?code=1002")
        .set("Accept", "application/json")
        .set("Authorization", "Bearer " + loggedInUser.token);

      expect(response.status).toEqual(200);
      expect(response.headers["content-type"]).toMatch(/json/);

      expect(response.body).toEqual(
        expect.objectContaining({
          status: "success",
          message: "No results",
        })
      );
    });
  });

// The POST /api/timetables endpoint tests
describe("POST timetables endpoint", () => {

  test("should create a new timetable", async() => {
    const data = {
      "codes": ["5G00EV17-3003"]
    };

    const response = await request(app)
      .post("/api/timetables")
      .set("Accept", "application/json")
      .set("Content", "appliction/json")
      .set("Authorization", "Bearer " + loggedInUser.token)
      .send(data);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Timetable added successfully.",
      })
    );
  });

  test("should fail with invalid course code", async() => {
    const data = {
      "codes": ["5G00EV17-3004"]
    };

    const response = await request(app)
      .post("/api/timetables")
      .set("Accept", "application/json")
      .set("Content", "appliction/json")
      .set("Authorization", "Bearer " + loggedInUser.token)
      .send(data);

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({"error": "Course code is invalid."});
  });

  test("should fail with no codes", async() => {
    const data = {
    };

    const response = await request(app)
      .post("/api/timetables")
      .set("Accept", "application/json")
      .set("Content", "appliction/json")
      .set("Authorization", "Bearer " + loggedInUser.token)
      .send(data);

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({"error" :"Codes is required and must be an array of strings."});
  });
});

  // The PUT /api/timetables endpoint tests
  describe("PUT timetables endpoint", () => {
    beforeEach(async() => {
      const user = await Users.findByUsername(loggedInUser.username);
      const codes = ["5G00EV17-3003"];
      await TimeTable.updateTimetableByUser(user?._id, codes);
    });

    it("should update an existing timetable ", async() => {
      const data = {
        "codes": ["5G00EV17-3003"]
      };

      const response = await request(app)
        .put("/api/timetables")
        .set("Accept", "application/json")
        .set("Content", "appliction/json")
        .set("Authorization", "Bearer " + loggedInUser.token)
        .send(data);

      expect(response.status).toEqual(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          message: "Timetable updated successfully.",
        })
      );
    });

    it("should not update a course code that doesn't exist", async() => {
      const data = {
        "codes": ["5G00EV17-3004"]
      };

      const response = await request(app)
        .post("/api/timetables")
        .set("Accept", "application/json")
        .set("Content", "appliction/json")
        .set("Authorization", "Bearer " + loggedInUser.token)
        .send(data);

      expect(response.status).toEqual(400);
      expect(response.headers["content-type"]).toMatch(/json/);
    });

    it("should fail with no codes", async() => {
      const data = {
      };

      const response = await request(app)
        .post("/api/timetables")
        .set("Accept", "application/json")
        .set("Content", "appliction/json")
        .set("Authorization", "Bearer " + loggedInUser.token)
        .send(data);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual({"error" :"Codes is required and must be an array of strings."});
    });
    afterEach(async() => {
      const user = await Users.findByUsername(loggedInUser.username);
      await TimeTable.deleteTimetableByUser(user?._id);
    });
  });

  });
  afterEach(async() => {
    const findResult = await Users.findByUsername(loggedInUser.username);
    Users.deleteUserById(findResult?._id);
  });
});