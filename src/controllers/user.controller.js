const User = require("../models/user.model");

exports.getAll = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({ data: users });
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        message: "Foydalanuvchi topilmadi",
      });
    }
    res.status(200).json({ data: user });
  } catch (err) {
    next(err);
  }
};
