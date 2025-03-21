import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    Booking_ID: {
      type: "Number",
      required: true,
    },
    // Faculty_ID: {
    //   type: "Number",
    //   required: true,
    // },
    Hall_Name: {
      type: "String",
      required: true,
    },
    Student_ID: {
      type: "String",
      required: true,
    },
    Name: {    // New field added
      type: "String",
      required: true,
    },
    Department: {// jo kr rha h uska department
      type: "String",
      required: true,
    },
    Affiliated: {  //jis bhi club ne book kia ha uska department
      type: "String",
      required: true,
    },
    Status: {
      type: "String",
      enum: ["rejected", "approved", "pending"],
      default: "pending",
    },
    Date: {
      type: "Date",
      required: true,
    },
    Time_From: {
      type: "Date",
      required: false,
    },
    Time_To: {
      type: "Date",
      required: false,
    },
    Reason: {
      type: "String",
      required: true,
    },
    Remark: {
      type: "String",
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("booking", bookingSchema);
