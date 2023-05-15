const mongoose = require("mongoose");

let ord = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  shippingAddress: {
    addressLine1: { type: String },
    addressLine2: { type: String },
    state: { type: String },
    district: { type: String },
    village: { type: String },
    pincode: { type: Number },
  },
  orderTimeAndDate: { type: Number },
  orderDay: { type: String },
  orderDate: { type: Number },
  orderYear: { type: Number },
  paymentMethod: {
    method: { type: String, enum: ["online", "cod"], default: "cod" },
    isPaid: { type: Boolean },
  },
  isCancelled: {
    status: { type: Boolean },
    reasone: { type: String },
    time: { type: Number },
  },
  isShipped: {
    status: { type: Boolean },
    remark: { type: String },
    time: { type: Number },
  },
  isDelivered: {
    status: { type: Boolean },
    remark: { type: String },
    time: { type: Number },
  },
});

let Order = mongoose.model("order", ord);

module.exports = Order;
