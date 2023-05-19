const express = require("express");
const Product = require("../models/product.model");

const app = express.Router();

app.get("/", async (req, res) => {
  let { limit = 10, page = 1 } = req.query;
  try {
    let tot = await Product.find();
    let prod = await Product.find()
      .limit(limit)
      .skip(limit * (page - 1));
    res.send({ product: prod, total: tot.length });
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

module.exports = app;
