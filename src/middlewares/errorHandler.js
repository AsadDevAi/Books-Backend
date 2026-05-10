
module.exports = (err, req, res, next) => {
  
  if (err.name === "CastError") {
    return res.status(400).json({
      statusCode: 400,
      message: "Noto'g'ri ID format",
    });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0];
    if (field === "email") {
      return res.status(409).json({
        statusCode: 409,
        message: "Bu email allaqachon ro'yxatdan o'tgan",
      });
    }
    return res.status(409).json({
      statusCode: 409,
      message: `${field} allaqachon mavjud`,
    });
  }

  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    return res.status(400).json({
      statusCode: 400,
      message: "Validatsiya xatosi",
      errors,
    });
  }

  const statusCode = err.statusCode || 500;
  const response = {
    statusCode,
    message: err.message || "Server xatosi",
  };
  if (err.errors) response.errors = err.errors;

  if (statusCode >= 500) console.error(err);

  res.status(statusCode).json(response);
};

