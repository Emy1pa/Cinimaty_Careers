import mongoose from "mongoose";
const applicationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    cvUrl: {
      type: String,
      required: true,
    },
    offerId: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Reviewed", "Accepted", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Application =
  mongoose.models.Application ||
  mongoose.model("Application", applicationSchema);
export default Application;
