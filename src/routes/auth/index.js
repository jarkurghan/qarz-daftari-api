import { Router } from "express";
import { login, relogin } from "./login.js";
import { createAccount, signup } from "./sign-up.js";
import auth from "../../middlewares/auth.js";
const router = Router();

router.post("/access", auth, relogin);
router.post("/create-account", createAccount);
router.post("/sign-up", auth, signup);
router.post("/login", auth, login);

export default router;
