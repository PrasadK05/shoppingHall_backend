const mongoose = require("mongoose");

let ord = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  shippingAddress: {
    addressLine1: { type: String },
    addressLine2: { type: String },
    state: { type: String },
    district: { type: String },
    cityOrVillage: { type: String },
    pincode: { type: Number },
  },
  orderTimeAndDate: { type: Number },
  orderDate: { type: Number },
  orderMonth: { type: String },
  orderYear: { type: Number },
  paymentMethod: {
    method: { type: String, enum: ["online", "cod"], default: "cod" },
    isPaid: { type: Boolean },
  },
  isCancelled: {
    status: { type: Boolean, default: false },
    reasone: { type: String, default: null },
    time: { type: Number, default: null },
  },
  isShipped: {
    status: { type: Boolean, default: false },
    remark: { type: String, default: null },
    time: { type: Number, default: null },
  },
  isDelivered: {
    status: { type: Boolean, default: false },
    remark: { type: String, default: null },
    time: { type: Number, default: null },
  },
});

let Order = mongoose.model("order", ord);

module.exports = Order;
