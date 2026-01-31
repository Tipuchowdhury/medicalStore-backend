import { Router } from "express";
import { medicineController } from "./medicine.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = Router();
router.get("/", medicineController.getMedicine);
router.get("/:id", medicineController.getMedicineById);
router.post("/", auth(UserRole.SELLER), medicineController.createMedicine);

export const medicineRouter = router;
