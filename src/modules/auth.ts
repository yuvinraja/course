import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";

// Extend the Request interface to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const createJWT = (user: any) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET as string
  );
  return token;
};

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.send("Not authorized");
    return;
  }

  const [, token] = bearer.split(" "); // Split the bearer token to get the actual token
  if (!token) {
    res.status(401);
    res.send("Not authorized");
    return;
  }

  // Verify the token using the secret key
  // If the token is valid, it will decode the user information
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded; // Attach the decoded user info to the request object
    next(); // Call the next middleware or route handler
  } catch (error) {
    res.status(401);
    res.send("Not authorized");
  }
};

export const comparePasswords = async (
  password: string,
  hashedPassword: string
) => {
  return bcrypt.compare(password, hashedPassword);
};

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 10);
};
