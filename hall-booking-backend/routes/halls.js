import express from "express";
import { createHall, getAllHalls, getHall } from "../controllers/halls.js";
import { protectUserRoutes } from "../middleware/authmiddleware.js";
import { protectAdminRoutes } from "../middleware/adminVerify.js";

const router = express.Router();

//CREATE
router.post("/", protectAdminRoutes, createHall);

//GET Hall
router.get("/", getHall);

//GET ALL
router.get("/getAllHalls", getAllHalls);

export default router;
