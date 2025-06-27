import express from "express";
import router from "./router";
import morgan from "morgan";
import { protect } from "./modules/auth";
import { createUser, signIn } from "./handlers/user";

const app = express();

app.use(morgan("dev")); // Logging middleware
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded request bodies

app.get("/", (req, res) => {
    throw new Error("This is a test error"); // Intentionally throw an error to test error handling
});

app.use("/api", protect, router); 
// Use the router for all API routes
// “For any URL that starts with /api, pass the request to this router.”
// Complete router: GET /api/product, GET /api/update, etc.

app.post('/user', createUser); // Route for creating a new user
app.post('/signin', signIn); // Route for signing in an existing user

app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace
    res.status(500).send('Something broke!'); // Send a 500 Internal Server Error response
});

export default app;