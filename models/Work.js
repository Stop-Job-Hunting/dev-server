import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Work = new Schema(
  {
    username: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    company: { type: String },
    position: { type: String },
    city: { type: String },
    state: { type: String },
    website: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    summary: { type: String },
    highlights: [
      { type: String }
    ]
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Work;