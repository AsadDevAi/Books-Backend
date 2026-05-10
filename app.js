require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");

const authRoutes = require("./src/routes/auth.routes");
const userRoutes = require("./src/routes/user.routes");
const bookRoutes = require("./src/routes/book.routes");
const orderRoutes = require("./src/routes/order.routes");
const otpRoutes = require("./src/routes/otp.routes");
const errorHandler = require("./src/middlewares/errorHandler");

const app = express();

app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    statusCode: 404,
    message: "Endpoint topilmadi",
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 4001;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server ${PORT} portda ishlamoqda`);
    });
  })
  .catch((err) => {
    console.error("MongoDB ulanishda xato:", err.message);
    process.exit(1);
  });

