import request from "supertest";
import bcrypt from "bcrypt";
import {describe, expect} from '@jest/globals';

import app from "../index";
import { Users } from "../models/user";

// Mocking external modules
jest.mock("bcrypt");

describe("Auth Routes", () => {

  describe("/users", () => {
    beforeEach(() => {
      const mockCreate = jest.fn().mockResolvedValue(true);
      Users.create = mockCreate;
      const mockHash = jest.fn().mockResolvedValue("hashedPassword");
      bcrypt.hash = mockHash;
    });
    it("should sign up a new user", async () => {
      const response = await request(app)
        .post("/api/users/")
        .send({
          username: "Test User",
          password: "password123"
        });

      expect(response.statusCode).toBe(201);
      expect(response.body.message).toBe("User created successfully");
    });
    it('should return a 422 status if user exists', async () => {
      const mockFindByUsername = jest.fn().mockResolvedValue([{ username: 'Test User' }]);
      Users.findByUsername = mockFindByUsername;

      const response = await request(app)
        .post('/api/users/')
        .send({
          username: 'Test User',
          email: 'test@example.com'
        });

      expect(response.statusCode).toBe(422);
      expect(response.body.message).toBe("Could not create user, user exists");
    });
  });

  describe("/login", () => {
    beforeEach(() => {
      const findByUsername = jest.fn().mockResolvedValue(true);
      Users.findByUsername = findByUsername;
      const mockCompare = jest.fn().mockResolvedValue(true);
      bcrypt.compare = mockCompare;
    });

    it("should login an existing user and return a token", async () => {
      const response = await request(app)
        .post("/api/login")
        .send({
          username: "Test User",
          password: "password123"
        });

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("token");
    });

    it("should return a 401 status if credentials are wrong", async () => {
      const mockCompare = jest.fn().mockResolvedValue(false);
      bcrypt.compare = mockCompare; // Simulate wrong password

      const response = await request(app)
        .post("/api/login")
        .send({
          email: "test@example.com",
          password: "wrongpassword"
        });

      expect(response.statusCode).toBe(401);
      //expect(response.body.message).toBe("Could not identify user, credentials might be wrong");
    });
  });
});
