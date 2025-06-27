// Route handlers for user-related operations
import prisma from "../db";
import { hashPassword, comparePasswords, createJWT } from "../modules/auth";
import { NextFunction, Request, Response } from "express";

//create a new user
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
      },
    });

    const token = createJWT(user);
    res.json({ token });
  } catch (error) {
    error.type = "input"; // Custom error type for input validation
    next(error); // Pass the error to the error handling middleware
  }
};

//sign in an existing user
export const signIn = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  if (!user) {
    res.status(401).send("Invalid credentials");
    return;
  }

  const isValid = await comparePasswords(req.body.password, user.password);
  if (!isValid) {
    res.status(401).send("Invalid credentials");
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};
