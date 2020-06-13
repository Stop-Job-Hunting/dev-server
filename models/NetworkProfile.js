import mongoose from "mongoose";
const Schema = mongoose.Schema;

const NetworkProfile = new Schema(
  {
    username: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    network: { type: String },
    netusername: { type: String },
    url: { type: String }

  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default NetworkProfile;