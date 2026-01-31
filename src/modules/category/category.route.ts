import { Router } from "express";
import { categoryController } from "./category.controller";

const router = Router();
router.get("/", categoryController.getCategory);
router.post("/", categoryController.createCategory);

export const categoryRouter = router;
