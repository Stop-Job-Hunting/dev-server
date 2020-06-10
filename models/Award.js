import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Award = new Schema(
  {
    username: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    title: { type: String },
    date: { type: String },
    awarder: { type: String },
    summary: { type: String }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Award;