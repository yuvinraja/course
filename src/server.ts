import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";

// Extend the Request interface to include the shhh_secret property
declare global {
    namespace Express {
        interface Request {
            shhh_secret?: string;
        }
    }
}

const app = express();

app.use(morgan("dev")); // Logging middleware
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded request bodies
app.use(cors());

// Custom middleware to add a secret property to the request object
app.use((req, res, next) => {
    req.shhh_secret = "this is private";
    res.status(401);
    res.send("NOPE! You are not allowed to see this.");
    next(); 
});

app.get("/", (req, res) => {
    console.log("Welcome screen");
    res.status(200);
    res.json({message: req.shhh_secret})
});

app.use("/api", router); 
// Use the router for all API routes
// “For any URL that starts with /api, pass the request to this router.”
// Complete router: GET /api/product, GET /api/update, etc.

export default app;