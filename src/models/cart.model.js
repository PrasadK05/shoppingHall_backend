const mongoose = require("mongoose");

let cart = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  quantity: { type: Number },
});

let Cart = mongoose.model("cart", cart);

module.exports = Cart;
