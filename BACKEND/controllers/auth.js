import asyncHandler from "express-async-handler";
import User from "../models/StudentModel.js";
import { generateToken } from "../config/genrateToken.js";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendEmail.js"; //  Import email function

export const registerUser = asyncHandler(async (req, res) => {
  console.log("🔹 Register API called");
  console.log("Request Body:", req.body);

  const { Applicant_Name, Contact_Number, Password, Email } = req.body;

  if (!Applicant_Name || !Contact_Number || !Password || !Email) {
    console.log(" Missing required fields");
    return res.status(400).json({ msg: "Please fill all required fields." });
  }

  const passwordRegex = /^(?=.*[0-9])(?=.*[\W_]).{6,18}$/;
  if (!passwordRegex.test(Password)) {
    return res.status(402).json({ msg: "Password must be 6-18 characters long, include a number and a special character." });
  }

  console.log("debug1");
  
  const contactRegex = /^[0-9]{10}$/;
  if (!contactRegex.test(Contact_Number)) {
    console.log("❌ Invalid Contact Number:", Contact_Number);
    return res.status(409).json({ msg: "Contact Number must be exactly 10 digits." });
  }
  console.log("denug1111111");
  
  const userExist = await User.findOne({ Email });
  if (userExist) {
    console.log(" User already exists:", Email);
    return res.status(401).json({ msg: "User with this email already exists." });
  }
  console.log("debug1q");

  const userExistbyContact = await User.findOne({ Contact_Number });
  if (userExistbyContact) {
    console.log(" User already exists:", Contact_Number);
    return res.status(410).json({ msg: "User with this Contact Number already exists." });
  }
  console.log("debug2");

  
  const salt = await bcrypt.genSalt(10);
  const secpass = await bcrypt.hash(Password, salt);

  console.log("debug3");

  const user = await User.create({
    // User_Name,
    Contact_Number,
    Applicant_Name,
    Email,
    Password: secpass,
  });

  console.log(" User Created Successfully:", user);

  if (user) {
    console.log(" User registered successfully:", user);

    //  Send Welcome Email
    const emailSubject = "Welcome to Our Platform!";
    // const emailBody = `Hello ${Applicant_Name},\n\nThank you for registering! Your username is: ${User_Name}.\n\nBest Regards,\nTeam CampusEase`;
    const emailBody = `Hello ${Applicant_Name},\n\nThank you for registering!\n\nBest Regards,\nTeam CampusEase`;

    await sendEmail(Email, emailSubject, emailBody);

    res.status(201).json({
      _id: user._id,
      // User_Name: user.User_Name,
      Contact_Number: user.Contact_Number,
      Applicant_Name: user.Applicant_Name,
      Email: user.Email,
      token: generateToken(user._id),
    });
  } else {
    console.log(" Failed to create user");
    return res.status(500).json({ msg: "Failed to create user." });
  }
});

export const checkusername = asyncHandler(async (req, res) => {
  try {
    const { name } = req.query;
    const existingUser = await User.findOne({ User_Name: name });

    res.json({ isUnique: !existingUser });
  } catch (error) {
    console.error(" Error checking username:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export const authUser = asyncHandler(async (req, res) => {
  // const { identifier, Password } = req.body;
  // console.log(identifier);
  
  // const user = await User.findOne({
  //   $or: [{ Email: identifier }, { Contact_Number: identifier }],
  // });

  const { identifier, Password } = req.body;

  console.log("🔹 Login attempt for:", identifier);
  const user = await User.findOne({ identifier });
  console.log(user);
  
  if (!user) {
    console.log("here");
    return res.status(401).json({ msg: "Invalid credentials." });
  }

  const passwordCompare = await bcrypt.compare(Password, user.Password);
  if (passwordCompare) {
    res.status(200).json({
      _id: user._id,
      // User_Name: user.User_Name,
      Contact_Number: user.Contact_Number,
      Applicant_Name: user.Applicant_Name,
      Email: user.Email,
      token: generateToken(user._id),
    });
  } else {
    return res.status(401).json({ msg: "Invalid credentials." });
  }
});
