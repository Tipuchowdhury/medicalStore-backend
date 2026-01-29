import { Router } from "express";
import auth from "../../middleware/auth";
import { authController } from "./auth.controller";

const router = Router();
router.get("/me", auth(), authController.getMe);

export const authRouter = router;
