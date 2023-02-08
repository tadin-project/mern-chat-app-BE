import mongoose, { Schema } from "mongoose";
import IUser from "src/interfaces/models/IUser";

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    noHp: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: [
      {
        type: String,
        default: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", userSchema);
