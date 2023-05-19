const mongoose = require("mongoose");

let prod = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: [ {type: String} ],
  brand: { type: String, required: true },
  stock: { type: Number, required: true },
  rating: { type: Number, required: true },
  discountPercentage: { type: Number, required: true },
});

let Product = mongoose.model("product", prod);

module.exports = Product;
