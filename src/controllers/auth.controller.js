const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const generateToken = require("../utils/generateToken");

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);

exports.register = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({
        statusCode: 409,
        message: "Bu email allaqachon ro'yxatdan o'tgan",
      });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create({
      fullName,
      email,
      passwordHash,
      role: "USER",
    });

    const token = generateToken(user);

    res.status(201).json({
      data: {
        user: user.toJSON(),
        token,
      },
      message: "Muvaffaqiyatli ro'yxatdan o'tdingiz",
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        statusCode: 400,
        message: "Email yoki parol noto'g'ri",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        statusCode: 403,
        message: "Hisob faol emas",
      });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({
        statusCode: 400,
        message: "Email yoki parol noto'g'ri",
      });
    }

    const token = generateToken(user);

    res.status(200).json({
      data: {
        user: user.toJSON(),
        token
      },
      message: "Tizimga muvaffaqiyatli kirdingiz",
    });
  } catch (err) {
    next(err);
  }
};


exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        message: "Foydalanuvchi topilmadi",
      });
    }
    res.status(200).json({
      data: user.toJSON(),
      message: "Profil ma'lumotlari",
    });
  } catch (err) {
    next(err);
  }
};

