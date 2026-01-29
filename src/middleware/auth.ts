import { NextFunction, Request, Response } from "express";
import { auth as betterAuth } from "../lib/auth";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        emailVerified: boolean;
        role: string;
      };
    }
  }
}

export enum UserRole {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
  SELLER = "SELLER",
}
const auth = (...role: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Authentication logic here
    const session = await betterAuth.api.getSession({
      headers: req.headers as Record<string, string>,
    });
    if (!session || !session.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!session.user.emailVerified) {
      return res.status(401).json({ message: "Email not verified" });
    }

    req.user = {
      id: session.user.id,
      email: session.user.email!,
      name: session.user.name!,
      emailVerified: session.user.emailVerified!,
      role: session.user.role!,
    };

    if (role.length && !role.includes(req.user.role as UserRole)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};

export default auth;
