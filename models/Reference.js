import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Reference = new Schema(
  {
    username: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    name: { type: String },
    reference: { type: String }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Reference;