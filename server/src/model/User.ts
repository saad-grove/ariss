import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  business: {
    type: String,
    required: false,
  },
  gstin: {
    type: String,
    required: false,
    unique: true,
  },
  billingAddress: {
    pincode: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    localAddress: {
      type: String,
      required: false,
    },
  },
  shippingAddress: {
    pincode: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    localAddress: {
      type: String,
      required: false,
    },
  },
  isApproved: {
    type: Boolean,
    required: false,
    default: false,
  },
  role: {
    type: String,
    enum: ["dealer", "employee"],
  },
  dealerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
