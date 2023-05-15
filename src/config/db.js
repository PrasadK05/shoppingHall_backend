const mongoose = require("mongoose");
require("dotenv").config();
const URL = process.env.URL;

const connect = mongoose.connect(URL);
module.exports = connect;
