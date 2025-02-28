import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    adminId: {
      type: "Number",
      required: true,
      unique: true,
    },
    adminName: {
      type: "String",
      required: true,
    },
    department: {
      type: "String",
      required: true,
    },
    email: {
      type: "String",
      required: true,
      unique: true,
    },
    password: {
      type: "String",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("admin", adminSchema);
