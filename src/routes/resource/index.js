import { Router } from "express";
import resource from "./resource.js";
import action from "../../middleware/actions.js";
import auth from "../../middleware/auth.js";
const router = Router();
import multer from "multer";
const upload = multer();
const type = upload.single("file");

// to-do: resourceni umumiy ishlash prinsipi tomondan yaxshilab o'ylab ko'rish kerak:
//        - biror website yoki havola resurs bo'lishi mumkin
//        - biror qo'lyozma resurs bo'lishi mumkin
//        - (hozir bor) saytdagi pdf resurs bo'lishi mumkin
//  - bu o'zgarishlarni qilish UI, API va Entity model darajasida o'zgartirish talab qiladi
//    va bazani bo'shatishni ham talab qilishi mumkin
router.get("/", auth, resource.get_resources);
router.post("/", auth, action("Create resource"), type, resource.add_resource);
router.get("/file/:id", resource.resource_file);

export default router;
