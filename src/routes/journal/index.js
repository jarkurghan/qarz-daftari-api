import { Router } from "express";
import { getJournalValue } from "./value.js";
import { createDebt, getDebt } from "./debt.js";
import auth from "../../middlewares/auth.js";
const router = Router();

router.get("/:journal_id/value", auth, getJournalValue);
router.get("/:journal_id/debt", auth, getDebt);
router.post("/debt", auth, createDebt);

export default router;
