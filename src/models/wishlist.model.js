const mongoose = require("mongoose");

let list = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

let Wishlist = mongoose.model("wishlist", list);

module.exports = Wishlist;
