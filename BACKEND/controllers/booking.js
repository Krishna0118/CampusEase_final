import booking from "../models/BookingModel.js";
import halls from "../models/HallsModel.js";
import { autoInc } from "../utils/AutoIncrement.js";

//CREATE BOOKING
export const createBooking = async (req, res) => {
  const selectedHallName = req.body.Hall_Name;
  const data = await halls.findOne({ Hall_Name: selectedHallName });

  req.body.Faculty_ID = data.Faculty_ID;
  const bookingId = await autoInc();
  const newBooking = req.body;
  newBooking["Booking_ID"] = bookingId;
  console.log(newBooking);
  try {
    const savedBooking = await booking.create(newBooking);
    res.status(200).json(savedBooking);
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err,
    });
  }
};

//DELETE BOOKING
export const deleteBooking = async (req, res) => {
  try {
    const deleteBooking = await booking.findByIdAndDelete(req.params.id);
    res.status(200).json("Object has been deleted");
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err,
    });
  }
};

//GET BOOKING
export const getBooking = async (req, res) => {
  try {
    const hotel = await booking.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err,
    });
  }
};

//GET Users BOOKINGS
export const getUserBookings = async (req, res) => {
  try {
    const user = req.user;
    // const bookingdate = new Date(req.query.date)
    const userBookings = await booking.find({
      Student_ID: user.Student_ID,
    }); // , Date: {$gt : bookingdate}
    res.status(200).json(userBookings);
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err,
    });
  }
};

//GET Admin BOOKINGS
export const getAdminBookings = async (req, res) => {
  try {
    console.log(req.user);
    const halls = await booking.find({
      Faculty_ID: req.user.adminId,
    });
    res.status(200).json(halls);
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err,
    });
  }
};

//Update Bookings
export const updateBooking = async (req, res) => {
  try {
    const halls = await booking
      .find({
        _id: req.body._id,
      })
      .updateOne({
        Status: req.body.Status,
      });

    res.status(200).json(halls);
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err,
    });
  }
};

//Get all Bookngs

export const getAllBookings = async (req, res) => {
  try {
    const halls = await booking.find({
      Status: { $in: ["approved", "pending"] },
    });
    res.status(200).json(halls);
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err,
    });
  }
};

export const getAvailableTimes = async (req, res, next) => {
  try {
    // Fetch approved bookings from MongoDB
    const hallname = req.query.hallname;
    const date = req.query.date;
    const bookedSlots = await booking.find({
      Status: "approved",
      Hall_Name: hallname,
      Date: date,
    });

    // Calculate available time slots
    const openingTime = new Date(date); // Define your opening time //
    openingTime.setHours(6, 0, 0, 0);

    const closingTime = new Date(date); // Define your closing time //
    closingTime.setHours(20, 30, 0, 0);
    const timeSlots = [];

    // Generate time slots between openingTime and closingTime
    const currentTime = new Date(openingTime);

    while (currentTime <= closingTime) {
      timeSlots.push(new Date(currentTime));
      currentTime.setMinutes(currentTime.getMinutes() + 30); // 30 minutes interval
    }

    // Remove booked slots from available time slots
    const availableTimeSlots = timeSlots.filter((timeSlot) => {
      const isOverlapping = bookedSlots.some((booking) => {
        return timeSlot >= booking.Time_From && timeSlot < booking.Time_To;
      });
      return !isOverlapping;
    });

    res.json({ availableTimeSlots });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err,
    });
  }
};
