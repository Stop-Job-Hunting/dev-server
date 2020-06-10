import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Skill = new Schema(
  {
    username: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    name: { type: String },
    level: { type: String },
    keywords: [{ type: String }]
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Skill;