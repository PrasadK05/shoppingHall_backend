const jwt = require("jsonwebtoken");
const token_secret = process.env.TOKEN_KEY;

const verifyToken = async function (req, res, next) {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const verification = await jwt.verify(token, token_secret);
    next();
  } catch (e) {
    return res.status(401).send({ message: e });
  }
};

module.exports = verifyToken;
