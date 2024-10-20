import { Router } from "express";
import { relogin } from "./login.js";
import { createAccount } from "./sign-up.js";
import auth from "../../middlewares/auth.js";
const router = Router();

router.post("/access", auth, relogin);
router.post("/create-account", createAccount);
router.post("/sign-up", auth, createAccount);
router.post("/login", auth, createAccount);

export default router;
