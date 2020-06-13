import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Basic = new Schema(
  {
    username: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    firstname: { type: String },
    lastname: { type: String },
    label: { type: String },
    picture: { type: String },
    email: { type: String },
    phone: { type: String },
    website: { type: String },
    summary: { type: String },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Basic;