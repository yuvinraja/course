import express from "express";
import router from "./router";
import morgan from "morgan";
import { protect } from "./modules/auth";
import { createUser, signIn } from "./handlers/user";

const app = express();

app.use(morgan("dev")); // Logging middleware
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded request bodies

app.get("/", (req, res, next) => {
    res.send("Welcome to the ExpressJS course!!!");
    console.log("Welcome screen");
    next(); // Call the next middleware or route handler
});

app.use("/api", protect, router);
// Use the router for all API routes
// “For any URL that starts with /api, pass the request to this router.”
// Complete router: GET /api/product, GET /api/update, etc.

app.post("/user", createUser); // Route for creating a new user
app.post("/signin", signIn); // Route for signing in an existing user

app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401).json({ error: "Unauthorized access" });
  } else if (err.type === "input") {
    res.status(400).json({ error: "Invalid input" });
  } else {
    console.error(err.stack); // Log the error stack trace
    res.status(500).send("Something broke! That one is on us!"); // Send a 500 Internal Server Error response
  }
});

export default app;
