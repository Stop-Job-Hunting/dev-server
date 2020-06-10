import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Publication = new Schema(
  {
    username: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    name: { type: String },
    publisher: { type: String },
    releaseDate: { type: String },
    website: { type: String },
    summary: { type: String }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Publication;