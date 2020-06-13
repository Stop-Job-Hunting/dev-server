import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Location = new Schema(
  {
    username: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    address: { type: String },
    postalCode: { type: String },
    city: { type: String },
    region: { type: String },
    countryCode: { type: String }


  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Location;