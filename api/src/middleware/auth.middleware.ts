import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../lib/db";

interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "No authentication token, access denied" });
    }

    // Expect header format: "Bearer <token>"
    const token = authHeader.replace("Bearer ", "").trim();
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as CustomJwtPayload;

    // Find user
    const user = await prisma.customer.findUnique({
      where: {
        id: decoded.userId,
      },
    });
    if (!user) {
      return res.status(401).json({ message: "Token is not valid" });
    }

    (req as any).user = user;
    next();
  } catch (error: any) {
    console.error("Authentication error:", error.message);
    return res.status(401).json({ message: "Token is not valid" });
  }
};

export default protectRoute;
