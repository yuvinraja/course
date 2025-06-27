import app from "../server";
import request from "supertest";

describe("GET /", () => {
  it("should return a welcome message", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Welcome to the ExpressJS course!");
  });
});
