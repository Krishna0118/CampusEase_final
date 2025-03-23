import mongoose from "mongoose";

const facultySchema = new mongoose.Schema(
  {
    faculty_name: {
      type: "String",
      required: true,
    },
    faculty_id: {
        type: "Number",
        required: true,
        unique: true,
      },
    
  },
  { timestamps: true }
);

export default mongoose.model("faculty", facultySchema);
