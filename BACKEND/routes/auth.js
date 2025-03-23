import express from "express";
import { authUser, registerUser, checkusername } from "../controllers/auth.js";
// import { authUser, registerUser } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authUser);
router.get("/checkusername", checkusername);

export default router;
