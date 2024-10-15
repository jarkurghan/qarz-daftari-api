import { Router } from "express";
import create from "./create.js";
import word from "./word.js";
import update from "./update.js";
import status from "./status.js";
import get from "./get.js";
import comment from "./comment.js";
import action from "../../middleware/actions.js";
const router = Router();

router.get("/list", get.getWords);
router.get("/list/:id/synonym", get.getSynonyms);
router.get("/:id/info", get.getByID);

router.post("/", action("Create word"), create.create_word_full);
router.post("/check", action("Create word"), create.new_word);

router.get("/:id/comment", comment.get);
router.post("/:id/comment", comment.create);
router.post("/:id/comment/like", comment.like);

router.put("/", action("Update word"), update.update_word);

router.patch("/status/submit", action("Update word"), status.active);
router.delete("/status/delete", action("Update word"), status.delete);

export default router;
