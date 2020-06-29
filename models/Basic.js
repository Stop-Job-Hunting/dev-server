import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Basic = new Schema(
  {
    username: { type: String, required: true, unique: true },
    isDeleted: { type: Boolean, default: false },
    firstname: { type: String },
    lastname: { type: String },
    label: { type: String },
    template: { type: String },
    picture: { type: String },
    email: { type: String },
    phone: { type: String },
    website: { type: String },
    summary: { type: String },
    skills: [{ type: String }],
    location: {
      postalCode: { type: String },
      city: { type: String },
      region: { type: String },
    },
    profiles: {
      network: { type: String },
      username: { type: String },
      url: { type: String },
    }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Basic;