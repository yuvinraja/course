import express from "express";
import router from "./router";
import morgan from "morgan";

const app = express();

app.use(morgan("dev")); // Logging middleware

app.get("/", (req, res) => {
    console.log("Welcome screen");
    res.status(200).send("Welcome to the ExpressJS API");
});

app.use("/api", router); 
// Use the router for all API routes
// “For any URL that starts with /api, pass the request to this router.”
// Complete router: GET /api/product, GET /api/update, etc.

export default app;