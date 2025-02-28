import express from "express";
import {
  createBooking,
  deleteBooking,
  getAdminBookings,
  getAllBookings,
  getAvailableTimes,
  getBooking,
  getUserBookings,
  updateBooking,
} from "../controllers/booking.js";
import { protectUserRoutes } from "../middleware/authmiddleware.js";
import { protectAdminRoutes } from "../middleware/adminVerify.js";
const router = express.Router();

//Genral routes
//AVAILABLE SLOTS FOR PARTICULAR HALL
router.get("/availableslots", getAvailableTimes);

//User Routes
//GET User Bookings
router.get("/userBookings", protectUserRoutes, getUserBookings);

//GET ALL
router.get("/allBookings", getAllBookings);

// Admin Routes
router.post("/createBooking", protectUserRoutes, createBooking);
router.get("/adminBookings", protectAdminRoutes, getAdminBookings);
router.delete("/deleteBooking", protectAdminRoutes, deleteBooking);
router.patch("/updateBooking", protectAdminRoutes, updateBooking);

router.get("/:id", getBooking);

export default router;
