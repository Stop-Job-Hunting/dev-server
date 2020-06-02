import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Resume = new Schema(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String },
    label: { type: String },
    picture: { type: String },
    phone: { type: String },
    website: { type: String },
    summary: { type: String },
    address: { type: String },
    postalCode: { type: String },
    city: { type: String },
    countryCode: { type: String },
    region: { type: String },
    email: { type: String, required: true },
    work: [{ type: String }]
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Resume;