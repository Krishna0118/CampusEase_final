import booking from "../models/BookingModel.js";
import halls from "../models/HallsModel.js";
import student from "../models/CollegeStudentModel.js";
import faculty from "../models/FacultyModel.js";
import { autoInc } from "../utils/AutoIncrement.js";


export const verifyuser = async (req, res) => {
  try {

      const { id, type } = req.query;

      if (!id || !type) {
          return res.status(400).json({ success: false, message: "Missing user ID or type" });
      }
      

      let user;
        
      if (type === "student") {
          user = await student.findOne({ student_id: id }); // Check in student database
      } else if (type === "faculty") {
          user = await faculty.findOne({ faculty_id: id }); // Check in faculty database
      } else {
        console.log("Invalid user type");
          return res.status(400).json({ success: false, message: "Invalid user type" });
      }

      if (user) {
          return res.status(200).json({ verified: true, message: "User verified" });
      } else {
        console.log("not found");
        
          return res.status(404).json({ verified: false, message: "User not found" });
      }


  } catch (error) {
      console.error("Error in verification:", error);
      res.status(500).json({ success: false, message: "Server error" });
  }
};





//CREATE BOOKING
export const createBooking = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: "Unauthorized. Please log in." });
  }

  console.log("Received Booking Data:", req.body); // Log the request body
  const selectedHallName = req.body.Hall_Name;
  const data = await halls.findOne({ Hall_Name: selectedHallName });

  // req.body.Faculty_ID = data.Faculty_ID;
  const bookingId = await autoInc();
  const newBooking = req.body;
  newBooking["Booking_ID"] = bookingId;
  newBooking["Student_ID"] = req.user.Student_ID;
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
  // try {
 
  //   const user = req.user;
  //   // const bookingdate = new Date(req.query.date)
  //   const userBookings = await booking.find({
  //     Student_ID: user.Student_ID,
  //   }); 
  //   console.log(userBookings);
 
  //   res.status(200).json(userBookings);
  // } catch (err) {
  //   res.status(400).json({
  //     status: "Failed",
  //     message: err,
  //   });
  // }

  try {
    
    // const userId = req.user._id;  // Extract user ID from authenticated request
    // console.log(userId);
    
    const usercontact = req.user.Contact_Number;

    // const bookings = await booking.find({ requesterId: userId }); // Filter by user ID
    const bookings = await booking.find({ Contact_Number: usercontact }); // Filter by user ID
    res.status(200).json(bookings);
} catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ msg: "Server error" });
}




};

//GET Admin BOOKINGS
export const getAdminBookings = async (req, res) => {
  try {
    console.log(req.user);
    // const halls = await booking.find({
    //   Faculty_ID: req.user.adminId,
    // });
    const halls = await booking.find({});


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
