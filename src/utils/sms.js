const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(accountSid, authToken);

module.exports.sendSms = async (params) => {
  try {
    let res= await client.messages.create({
      body: `Your reset password otp is ${params.OTP}`,
      from: "+12545406603",
      to: `+91${params.to}`,
    });
    // console.log(res);
    return true
  } catch (error) {
    console.log(error);
    return false;
  }
};

