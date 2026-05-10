const Book = require("../models/book.model");

exports.getAll = async (req, res, next) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json({ data: books });
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({
        statusCode: 404,
        message: "Kitob topilmadi",
      });
    }
    res.status(200).json({ data: book });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({
      data: book,
      message: "Kitob muvaffaqiyatli qo'shildi",
    });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      return res.status(404).json({
        statusCode: 404,
        message: "Kitob topilmadi",
      });
    }
    res.status(200).json({
      data: book,
      message: "Kitob muvaffaqiyatli yangilandi",
    });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({
        statusCode: 404,
        message: "Kitob topilmadi",
      });
    }
    res.status(200).json({
      data: { _id: book._id },
      message: "Kitob muvaffaqiyatli o'chirildi",
    });
  } catch (err) {
    next(err);
  }
};

