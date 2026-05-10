
module.exports = (schema, source = "body") => {
  return (req, res, next) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      const errors = result.error.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      }));
      return res.status(400).json({
        statusCode: 400,
        message: "Validatsiya xatosi",
        errors,
      });
    }
    req[source] = result.data;
    next();
  };
};

