import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Volunteer = new Schema(
  {
    username: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    organization: { type: String },
    position: { type: String },
    website: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    summary: { type: String },
    highlights: [
      { type: String },
    ]
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Volunteer;