import { Router } from "express";
import { adminController } from "./admin.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = Router();
router.get("/", auth(UserRole.ADMIN), adminController.getAllUsers);
router.patch("/:id", auth(UserRole.ADMIN), adminController.updateUser);

export const adminRouter = router;
