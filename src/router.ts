//THis file will be used to define the routes for the application
import { Router } from "express";
import { body, check, oneOf, validationResult } from "express-validator";
import { handleInputError } from "./modules/middleware";
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from "./handlers/product";
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from "./handlers/update";

const router = Router();

//
// Product Routes
//
router.get("/product", getProducts);

router.get("/product/:id", getOneProduct);

router.put(
  "/product/:id",
  [body("name").isString()],
  handleInputError,
  updateProduct
);

router.post(
  "/product",
  [body("name").isString()],
  handleInputError,
  createProduct
);

router.delete("/product/:id", deleteProduct);

//
// Update Routes
//
router.get("/update", getUpdates);

router.get("/update/:id", getOneUpdate);

router.put(
  "/update/:id",
  [
    body("title").optional(),
    body("body").optional(),
    oneOf([
      check("status").equals("IN_PROGRESS"),
      check("status").equals("SHIPPED"),
      check("status").equals("DEPRECATED"),
    ]),
    body("version").optional(),
  ],
  updateUpdate
);

router.post(
  "/update",
  [
    body("title").optional(),
    body("body").optional(),
    body("productId").exists().isString(),
  ],
  createUpdate
);

router.delete("/update/:id", deleteUpdate);

//
// Update Point Routes
//
router.get("/updatepoint", (req, res) => {
  // Fetch all update points
});

router.get("/updatepoint/:id", (req, res) => {
  // Fetch a single update point by ID
});

router.put(
  "/updatepoint/:id",
  [
    body("name").optional().isString(),
    body("description").optional().isString(),
  ],
  (req, res) => {
    // Update a specific update point
  }
);

router.post(
  "/updatepoint",
  [
    body("name").isString(),
    body("description").isString(),
    body("updateId").exists().isString(),
  ],
  (req, res) => {
    // Create a new update point
  }
);

router.delete("/updatepoint/:id", (req, res) => {
  // Delete a specific update point by ID
});

export default router;
