const express = require("express");
const verifyToken = require("../middlewares/auth.middleware");
const token_secret = process.env.TOKEN_KEY;

const app = express.Router();

app.use(verifyToken);

app.post("/singleProduct", async (req, res) => {
  let { token } = req.headers;
  let { id, quantity,shipingAddress, paymentMethod } = req.body;
  let decode = jwt.decode(token, token_secret);

  try {
    
  } catch (error) {
    
  }

});

module.exports = app;
