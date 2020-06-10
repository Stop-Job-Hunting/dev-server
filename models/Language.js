import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Language = new Schema(
  {
    username: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    language: { type: String },
    fluency: { type: String }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Language;