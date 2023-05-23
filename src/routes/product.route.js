const express = require("express");
const Product = require("../models/product.model");

const app = express.Router();

app.get("/", async (req, res) => {
  let { category, sortByPrice, limit = 10, page = 1 } = req.query;
  let tot;
  let prod;
  let val;
  if (sortByPrice === "asc") {
    val = 1;
  } else if (sortByPrice === "desc") {
    val = -1;
  }
  try {
    if (category && sortByPrice) {
      tot = await Product.find({ category });
      prod = await Product.find({ category })
        .sort({ price: val })
        .limit(limit)
        .skip(limit * (page - 1));
    } else if (category) {
      tot = await Product.find({ category });
      prod = await Product.find({ category })
        .limit(limit)
        .skip(limit * (page - 1));
    } else if (sortByPrice) {
      tot = await Product.find();
      prod = await Product.find()
        .sort({ price: val })
        .limit(limit)
        .skip(limit * (page - 1));
    } else {
      tot = await Product.find();
      prod = await Product.find()
        .limit(limit)
        .skip(limit * (page - 1));
    }

    res.status(200).send({ product: prod, total: tot.length });
  } catch (error) {
    res.status(404).send({ message: "something went wrong" });
    console.log(error);
  }
});

app.get("singleProduct/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let prod = await Product.findOne({ _id: id });
    res.status(200).send({ product: prod });
  } catch (error) {
    res.status(404).send({ message: "Product not found" });
    console.log(error);
  }
});

app.get("/search", async (req, res) => {
  let { name } = req.query;

  let regex = new RegExp(name, "i");
  try {
    let prod = await Product.find({ title: regex });
    res.status(200).send({ product: prod });
  } catch (error) {
    res.status(404).send({ message: "Product not found" });
    console.log(error);
  }
});

module.exports = app;
