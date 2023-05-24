const express = require("express");
const Order = require("../models/order.model");
const Product = require("../models/product.model");
const verifyToken = require("../middlewares/auth.middleware");
const { giveDate } = require("../utils/date");
const jwt = require("jsonwebtoken");
const token_secret = process.env.TOKEN_KEY;

const app = express.Router();

app.use(verifyToken);

app.post("/singleProduct", async (req, res) => {
  let { token } = req.headers;
  let { id, quantity, shippingAddress, paymentMethod } = req.body;
  let decode = jwt.decode(token, token_secret);
  let values = giveDate();
  let bool;
  if (paymentMethod === "cod") {
    bool = false;
  } else if (paymentMethod === "online") {
    bool = true;
  }
  try {
    let prod = await Product.findOne({ _id: id });
    if (prod.stock < quantity) {
      return res.status(400).send({ message: "stock is not sufficient" });
    }
    let stk = prod.stock - quantity;
    let ord = await Order.create({
      productId: id,
      userId: decode._id,
      quantity,
      shippingAddress,
      paymentMethod: { method: paymentMethod, isPaid: bool },
      orderTimeAndDate: values.timestamp,
      orderDate: values.date,
      orderMonth: values.month,
      orderYear: values.year,
    });

    let prod1 = await Product.updateOne({ _id: id }, { stock: stk });
    return res.status(200).send({ message: "order successfull", id: ord._id });
  } catch (error) {
    return res.status(404).send({ message: "order unsuccessfull" });
  }
});

module.exports = app;
