import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Education = new Schema(
  {
    username: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    institution: { type: String, required: true },
    area: { type: String },
    location: { type: String },
    studyType: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    gpa: { type: String },
    courses: [
      { type: String }
    ]
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Education;