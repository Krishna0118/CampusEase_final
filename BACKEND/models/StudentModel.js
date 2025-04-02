import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    // Student_ID: {
    //   type: "Number",
    //   // required: true,
    //   // unique: true,
    // },
    // User_Name: {
    //   type: "String",
    //   required: true,
    //   unique: true,
    // },
    Contact_Number: {
      type: "Number",
      required: true,
      match: /^[0-9]{10}$/, // Ensures exactly 10 digits
      unique: true, // Prevents duplicate numbers
      trim: true
    }, 
    // Student_Name: {
    Applicant_Name: {
      type: "String",
      required: true,
    },
    // Department: {
    //   type: "String",
    //   required: true,
    // },
    Email: {
      type: "String",
      required: true,
      unique: true,
    },
    Password: {
      type: "String",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("student", studentSchema);
// export default mongoose.model("user", studentSchema);
