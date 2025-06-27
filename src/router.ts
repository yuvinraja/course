//THis file will be used to define the routes for the application
import { Router } from "express";
import { body, validationResult } from "express-validator";

const router = Router();

// Product Routes
router.get("/product", (req, res) => {
  // Fetch all products
  res.status(200).json({ message: "Get all products" });
});

router.get("/product/:id", (req, res) => {
  // Fetch a single product by ID
});

router.put("/product/:id", [body("name").isString()], (req, res) => {
  // Update a product by ID
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
});

router.post("/product", (req, res) => {
  // Create a new product
});

router.delete("/product/:id", (req, res) => {
  // Delete a product by ID
});

// Update Routes
router.get("/update", (req, res) => {
  // Fetch all updates
});

router.get("/update/:id", (req, res) => {
  // Fetch a single update by ID
});

router.put("/update/:id", (req, res) => {
  // Update a specific update by ID
});

router.post("/update", (req, res) => {
  // Create a new update
});

router.delete("/update/:id", (req, res) => {
  // Delete a specific update by ID
});

// Update Point Routes
router.get("/updatepoint", (req, res) => {
  // Fetch all update points
});

router.get("/updatepoint/:id", (req, res) => {
  // Fetch a single update point by ID
});

router.put("/updatepoint/:id", (req, res) => {
  // Update a specific update point
});

router.post("/updatepoint", (req, res) => {
  // Create a new update point
});

router.delete("/updatepoint/:id", (req, res) => {
  // Delete a specific update point by ID
});

export default router;
