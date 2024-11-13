import { Router } from "express";
import { getJournalValue } from "./value.js";
import { createDebtItem } from "./debt.js";
import { createDebt, getDebt, getDebtItem } from "./debt.js";
import auth from "../../middlewares/auth.js";
const router = Router();

router.get("/:journal_id/value", auth, getJournalValue);
router.get("/:journal_id/debt", auth, getDebt);
router.post("/debt", auth, createDebt);
router.get("/debt/:debt_id", auth, getDebtItem);
router.post("/debt/item", auth, createDebtItem);

export default router;
