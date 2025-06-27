import { validationResult } from "express-validator";

export const handleInputError = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  else {
    console.log("No validation errors found");
    next(); // Proceed to the next middleware or route handler
  }
}