const Order = require("../models/order.model");
const Book = require("../models/book.model");
const User = require("../models/user.model");

exports.create = async (req, res, next) => {
  try {
    const { bookId, quantity } = req.body;
    const userId = req.user.id;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        statusCode: 404,
        message: "Kitob topilmadi",
      });
    }

    if (book.stock < quantity) {
      return res.status(400).json({
        statusCode: 400,
        message: `Kitob yetarli emas, mavjud: ${book.stock} ta`,
      });
    }

    const activeOrder = await Order.findOne({
      userId,
      bookId,
      status: "PENDING",
    });
    if (activeOrder) {
      return res.status(400).json({
        statusCode: 400,
        message: "Siz bu kitobni allaqachon buyurtma qilgansiz",
      });
    }

    const totalPrice = book.price * quantity;

    book.stock -= quantity;
    await book.save();

    const order = await Order.create({
      userId,
      bookId,
      quantity,
      totalPrice,
      status: "PENDING",
    });

    res.status(201).json({
      data: order,
      message: "Buyurtma muvaffaqiyatli yaratildi",
    });
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("userId", "fullName email")
      .populate("bookId", "title author price")
      .sort({ createdAt: -1 });
    res.status(200).json({ data: orders });
  } catch (err) {
    next(err);
  }
};

exports.getMyOrders = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const authUserId = req.user.id;

    if (userId !== authUserId.toString() && req.user.role !== "ADMIN") {
      return res.status(403).json({
        statusCode: 403,
        message: "Siz boshqa foydalanuvchining buyurtmalarini ko'ra olmaysiz",
      });
    }

    const orders = await Order.find({ userId })
      .populate("bookId", "title author price")
      .sort({ createdAt: -1 });

    res.status(200).json({ data: orders });
  } catch (err) {
    next(err);
  }
};

exports.cancel = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        statusCode: 404,
        message: "Buyurtma topilmadi",
      });
    }

    if (req.user.role !== "ADMIN" && order.userId.toString() !== req.user.id) {
      return res.status(403).json({
        statusCode: 403,
        message: "Buyurtmangizni faqat o'zingiz yoki admin bekor qilishi mumkin",
      });
    }

    if (order.status !== "PENDING") {
      return res.status(400).json({
        statusCode: 400,
        message: "Faqat PENDING holatdagi buyurtmani bekor qilish mumkin",
      });
    }

    const book = await Book.findById(order.bookId);
    if (book) {
      book.stock += order.quantity;
      await book.save();
    }

    order.status = "CANCELLED";
    await order.save();

    res.status(200).json({
      data: { _id: order._id, status: order.status },
      message: "Buyurtma bekor qilindi",
    });
  } catch (err) {
    next(err);
  }
};

