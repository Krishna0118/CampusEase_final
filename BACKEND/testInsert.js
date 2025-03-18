import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/StudentModel.js"; // Adjust the path if needed
import bcrypt from "bcryptjs";
import Admin from "./models/AdminModel.js";
import Halls from "./models/HallsModel.js";
dotenv.config();

// const connect = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO);
//     console.log("MongoDB Connected Successfully");
//   } catch (error) {
//     console.error("MongoDB Connection Failed:", error.message);
//     process.exit(1);
//   }
// };

// const testInsert = async () => {
//   await connect();

//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash("testpassword", salt);

//   const newUser = new User({
//     Student_ID: "2023123",
//     Student_Name: "Test User",
//     Department: "CSE",
//     Password: hashedPassword,
//     Email: "test@example.com",
//   });

//   try {
//     await newUser.save();
//     console.log("User Saved Successfully to Database");
//     mongoose.connection.close(); // Close the connection after insertion
//   } catch (error) {
//     console.error("Error Saving User:", error);
//     mongoose.connection.close();
//   }
// };








const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

// const testInsert = async () => {
//   await connect();

//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash("kanishka", salt);

//   const newadmin = new Admin({
//     adminId: "1074",
//     adminName: "Kanishka",
//     department: "HOI",
//     email: "kanishka@gmail.com",
//     password: hashedPassword, 
//   });

//   try {
//     await newadmin.save();
//     console.log("Admin Saved Successfully to Database");
//     mongoose.connection.close(); // Close the connection after insertion
//   } catch (error) {
//     console.error("Error Saving User:", error);
//     mongoose.connection.close();
//   }
// };

const testInsert = async () => {
  await connect();

  const newHall = new Halls({
    Faculty_ID: 101,
    Hall_ID: "H001",
    Hall_Name: "Seminar Hall A",
    Department: "CSE",
    Description: "A well-equipped seminar hall with modern amenities.",
    Capacity: 150,
    Image1: "https://example.com/image1.jpg",
    Image2: "https://example.com/image2.jpg",
  });

  try {
    await newHall.save();
    console.log("Hall Saved Successfully to Database");
    mongoose.connection.close(); // Close the connection after insertion
  } catch (error) {
    console.error("Error Saving Hall:", error);
    mongoose.connection.close();
  }
};

testInsert();
