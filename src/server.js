require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const connect = require("./config/db");

const userRoute = require("./routes/user.route");


const PORT = process.env.PORT;

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileupload({ useTempFiles: true }));
app.use(bodyParser.json());

app.use("/user", userRoute);

app.get("/", async (req, res) => {  
  res.send("SHOPHALL'S SERVER");
});

app.listen(PORT, async () => {
  try {    
    await connect;
    console.log(`running at ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
