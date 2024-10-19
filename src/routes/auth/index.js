import { Router } from "express";
import { login } from "./login.js";
// import action from "./action.js";
// import user from "./user.js";
import auth from "../../middleware/auth.js";
// import actions from "../../middleware/actions.js";
// import { sendSMS } from "../../tools/send-message.js";
const router = Router();

router.post("/token", login);

router.use(auth);

// router.get("/", actions("View users"), user.getUsers);
// router.get("/status", actions("View users"), user.getStatuses);
// router.post("/", actions("Create user"), user.create);
// router.put("/", actions("Update user info"), user.update);
// router.get("/action", actions("View users"), action.get_all_user_action);
// router.post("/action", actions("Update user info"), action.action_add);
// router.delete("/action", actions("Update user info"), action.action_del);
// router.get("/actions", actions("View users"), action.get_action);

export default router;
