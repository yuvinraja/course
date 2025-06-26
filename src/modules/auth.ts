import jwt from "jsonwebtoken";

export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );
  return token;
};

export const protect = (req, res, next) => {
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
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user info to the request object
    next(); // Call the next middleware or route handler
  } catch (error) {
    res.status(401);
    res.send("Not authorized");
  }
};
