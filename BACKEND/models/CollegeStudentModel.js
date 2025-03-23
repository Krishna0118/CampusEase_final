import mongoose from "mongoose";

const collegeStudentSchema = new mongoose.Schema(
  {
    student_id: {
      type: String,  
      required: true,
      unique: true,
    },
    student_name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("CollegeStudent", collegeStudentSchema);
