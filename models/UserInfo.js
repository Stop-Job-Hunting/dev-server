import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserInfo = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, unique: false },
    houseNumber: {{ type: String, unique: false },

  _queryable: { type: Boolean, default: true }
    // NOTE If you wish to add additional public properties for profiles do so here
  },
{ timestamps: true, toJSON: { virtuals: true } }
);

export default UserInfo;