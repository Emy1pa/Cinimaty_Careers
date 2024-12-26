import mongoose, { Document, Schema } from "mongoose";
interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  isAdmin: boolean;
}
const UserSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: [true, "Full Name is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone Number is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const UserModel =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default UserModel;
