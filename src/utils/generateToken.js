const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const secret = process.env.JWT_TOKEN_SECRET || process.env.JWT_SECRET;
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    secret,
    { expiresIn: process.env.JWT_TOKEN_EXPIRATION || "1d" }
  );
};

module.exports = generateToken;
