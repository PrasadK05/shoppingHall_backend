require("dotenv").config();
const express = require("express");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const { generateOTP } = require("../utils/otp");
const { sendMail } = require("../utils/mail");

const token_secret = process.env.TOKEN_KEY;

const app = express.Router();

app.post("/signup", async (req, res) => {
  let data = req.body;
  // RegEx for Password, Eamil and Mobile Number
  let emailRegex =
    /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-z]{2,4})$/;
  let mobNumberRegex = /^[6-9]\d{9}$/;
  let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  // Checking values as per RegEx
  if (!emailRegex.test(data.email)) {
    return res.send({ status: false, message: "Invalid Email" });
  }
  if (!mobNumberRegex.test(data.mobNumber)) {
    return res.send({ status: false, message: "Invalid Mobile Number" });
  }
  if (!passwordRegex.test(data.password)) {
    return res.send({ status: false, message: "Invalid Password" });
  }

  // Checking exsitance of user
  let already_exist = await User.findOne({ email: data.email });
  if (already_exist) {
    return res.send({ status: false, message: "User Already Registered" });
  }
  // Signup
  let hash = await argon2.hash(data.password);
  let user = await User.create({ ...data, password: hash });
  if (user) {
    return res.send({
      status: true,
      messege: "User Created Successfully",
    });
  } else {
    return res.send({ status: false, messege: "Something Went Wrong" });
  }
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      if (await argon2.verify(user.password, password)) {
        let bdy = {
          email,
          fillName,
          avatar,
          addressLine1,
          addressLine2,
          state,
          district,
          village,
          pincode,
        };
        let token = jwt.sign(bdy, token_secret, {
          expiresIn: "28 days",
        });

        res.status(200).send({ status: true, token, user: body });
      } else {
        return res.send({ status: false, messege: "Wrong Password" });
      }
    } else {
      return res.send({ status: false, messege: "User not found" });
    }
  } catch (e) {
    return res.send({ status: false, messege: "User not found" });
  }
});

app.post("/get-otp", async (req, res) => {
  let { email } = req.body;
  const otpGenerate = generateOTP();

  try {
    let user = await User.findOne({ email });
    if (user) {
      try {
        let updateOtp = await User.updateOne({ email }, { otp: otpGenerate });

        let mail = await sendMail({
          to: email,
          OTP: otpGenerate,
        });
        if (mail) {
          return res.send({
            status: true,
            otp: "otp sent to register email id",
          });
        } else {
          return res.send({ status: false, massage: "something went wrong" });
        }
      } catch (error) {
        return res.send({ status: false, massage: "something went wrong" });
      }
    }
  } catch (error) {
    return res.send({ status: false, messege: "User not found" });
  }
});

app.post("forgot-password", async (req, res) => {
  let { email, otp, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.send("user not found !");
  }
  if (user.otp != otp) {
    return res.send({ status: false, messege: "wrong otp" });
  }
  let hash = await argon2.hash(password);
  try {
    let updateUser = await User.findOneAndUpdate({ email }, { password: hash });
    res.send({ status: true, messege: "password updated successfully" });
  } catch (error) {
    return res.send({ status: false, messege: "something went wrong" });
  }
});

module.exports = app;
