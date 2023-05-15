const mongoose = require("mongoose");

let users = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  mobNumber: { type: String, required: true },
  password: { type: String, required: true },
  avatar: {
    type: String,
    default: null,
  },
  addressLine1: { type: String, default: null },
  addressLine2: { type: String, default: null },
  state: { type: String, default: null },
  district: { type: String, default: null },
  village: { type: String, default: null },
  pincode: { type: Number, default: null },
  role: {
    type: String,
    enum: ["user", "admin", "shippingUser", "deliveryUser"],
    default: "user",
  },
  otp: { type: String, default: null },
});

let User = mongoose.model("user", users);

module.exports = User;
