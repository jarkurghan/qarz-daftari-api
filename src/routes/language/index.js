import { Router } from "express";
import language from "./language.js";
import action from "../../middleware/actions.js";
const router = Router();

// to-do: language APIlarni qaytadan o'ylab ko'rish kerak:
//        - bir nechta tillar bilan ishlash prinsipi qanchalik qulay
//          - tillarni shunchaki yaratib bo'lmaydi, ma'lum userlar ma'lum tillar uchun ishlaydi
//        - bir nechta tillar bilan ishlash app uchun kerakmi
router.get("/", language.get_languages);
router.get("/:id/type", language.get_word_types);
// router.post("/", action("Create language"), language.add_language);
// router.post("/type", action("Create word type"), language.add_word_types);

export default router;
