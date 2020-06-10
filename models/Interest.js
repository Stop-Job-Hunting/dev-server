import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Interest = new Schema(
  {
    username: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    name: { type: String },
    keywords: [{ type: String }]
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Interest;