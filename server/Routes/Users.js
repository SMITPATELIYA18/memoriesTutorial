import Express from "express";
import { signIn, signUp } from "../Controllers/Users.js";

const router = Express.Router();

router.post("/signIn", signIn);
router.post("/signUp", signUp);

export default router;