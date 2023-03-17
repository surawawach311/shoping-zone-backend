import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
const config = process.env;

export interface AuthenticatedRequest extends Request {
  user: any;
}

const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).json("A token is require for authentication");
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET as string);
    req.user = decoded;
  } catch (error) {
    return res.status(401).json("Invalid Token");
  }

  return next();
};

module.exports = verifyToken;
