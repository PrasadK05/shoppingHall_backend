const mongoose = require("mongoose");
require("dotenv").config();
const URL = process.env.URL;

const connect = () => {
  mongoose.set("strictQuery", false);
  return mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }) .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });
};

module.exports = connect;