import { Router } from "express";
import { search } from "./search.js";
import { wordInfo } from "./wordInfo.js";
import { viewCountIncrement } from "./view.js";
const router = Router();

router.get("/search", search);
router.get("/info/:word", wordInfo);
router.post("/word/view", viewCountIncrement);

export default router;
