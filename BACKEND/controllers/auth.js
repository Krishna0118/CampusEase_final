import asyncHandler from "express-async-handler";
import User from "../models/StudentModel.js";
import { generateToken } from "../config/genrateToken.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// const JWT_SECRET=process.env.JWT_SECRET;
export const registerUser = asyncHandler(async (req, res) => {
  console.log("Register API called"); 
  console.log("Request Body:", req.body); 

  const { Student_ID, Student_Name, Department, Password, Email } = req.body;
  if (!Student_ID || !Student_Name || !Password || !Department || !Email) {
    console.log("Missing required fields");
    return res.status(400).json({ msg: "Please fill all required field" });
    // throw new Error( "Please fill all required field")
  }

  const passwordRegex = /^(?=.*[0-9])(?=.*[\W_]).{6,18}$/;
  if (!passwordRegex.test(Password)) {
    return res.status(402).json({ msg: "Password must be 6-18 characters long, include a number and a special character." });
  }

  const userExist = await User.findOne({ Email });
  if (userExist) {
    console.log("User already exists:", Email);

    return res.status(401).json({ msg: "User with this email already exist." });
  }
  const salt = await bcrypt.genSalt(10);
  const secpass = await bcrypt.hash(Password, salt);

  const user = await User.create({
    Student_ID,
    Email,
    Student_Name,
    Password: secpass,
    Department,
  });
  // await user.save();
  console.log("User Created Successfully 1:", user);
  if (user) {
    console.log("User registered successfully 2:", user);
    res.status(201).json({
      _id: user._id,
      Student_ID: user.Student_ID,
      Student_Name: user.Student_Name,
      Department: user.Department,
      Email: user.Email,
      token: generateToken(user._id),
    });
  } else {
    console.log("Failed to create user");
    return res.status(401).json({ msg: "failed to create user." });
  }
});

export const authUser = asyncHandler(async (req, res) => {
  const { Email, Password } = req.body;
  const user = await User.findOne({ Email });
  const passwordCompare = await bcrypt.compare(Password, user.Password);
  if (user && passwordCompare) {
    res.status(200).json({
      _id: user._id,
      Student_ID: user.Student_ID,
      Student_Name: user.Student_Name,
      Department: user.Department,
      Email: user.Email,
      token: generateToken(user._id),
    });
  } else {
    console.log("Failed to create user");
    return res.status(401).json({ msg: "Invalid credentials." });
    //    throw new Error("Invalid credentials.");
  }
});
