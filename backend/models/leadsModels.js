const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      unique: true,
      match: [/^\d{10}$/, "Please enter a valid 10-digit mobile number"],
    },
    leadLinePhone: {
      type: String,
      required: [true, "Lead line phone number is required"],
      match: [/^\d{10}$/, "Please enter a valid 10-digit lead line phone number"],
    },
    shopName: {
      type: String,
      required: [true, "Shop name is required"],
      unique: true,
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
    },
    pinCode: {
      type: String,
      required: [true, "Pin code is required"],
      match: [/^\d{6}$/, "Please enter a valid 6-digit pin code"],
    },
  
      status: {
      type: Boolean,
      required: [true, "Status is required"],
      default: true,
    },
  },
  { timestamps: true }
);

const LeadModel = mongoose.model("Lead", leadSchema);

module.exports = LeadModel;
