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
    Hall_ID: "H009",
    Hall_Name: "Sports Complex",
    Department: "CSE",
    Description: "A college sports complex is a multi-sport facility equipped with courts, fields, and gyms for various athletic activities. It supports training, competitions, and promotes physical fitness and sportsmanship among students.",
    Capacity: "100",
    Image1: "https://res.cloudinary.com/dpswdrktw/image/upload/v1742553544/sports_ncayql.webp",
    Image2: "https://res.cloudinary.com/dpswdrktw/image/upload/v1742553339/sport_complex_a5kip4.webp"

  });

  try {
    console.log("Inserting new hall:", newHall); 
    await newHall.save();
    console.log("Hall Saved Successfully to Database ");

    mongoose.connection.close(); // Close DB connection
  } catch (error) {
    console.error("Error Saving Hall:", error);
    mongoose.connection.close();
  }
};
testInsert();
