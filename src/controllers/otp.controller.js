const transporter = require("../config/mail");
const otpStore = require("../utils/otpStore");

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        statusCode: 400,
        message: "Email majburi",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        statusCode: 400,
        message: "Email noto'g'ri formatda",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    otpStore[email] = otp;

    setTimeout(() => {
      delete otpStore[email];
    }, 5 * 60 * 1000);

    const responseData = {
      statusCode: 200,
      message: "OTP yaratildi",
      email: email
    };

    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Book Store - OTP Kodi",
      html: `
        <h2>Sizning OTP Kodingiz</h2>
        <p>Quyidagi kodni 5 minut ichida kiriting:</p>
        <h1 style="color: #007bff;">${otp}</h1>
      `,
    }).catch((error) => {
      console.error("Email yuborishda xato:", error.message);
    });

    res.status(200).json(responseData);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
};

exports.verifyOTP = (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        statusCode: 400,
        message: "Email va OTP majburi",
      });
    }

    const storedOTP = otpStore[email];

    if (!storedOTP) {
      return res.status(400).json({
        statusCode: 400,
        message: "OTP muddati tugagan yoki email topilmadi",
      });
    }

    if (String(storedOTP) !== String(otp)) {
      return res.status(400).json({
        statusCode: 400,
        message: "OTP noto'g'ri",
      });
    }

    delete otpStore[email];

    res.status(200).json({
      statusCode: 200,
      message: "OTP tasdiqlandi",
      email: email,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
};

