exports.roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
      return res.status(403).json({
        statusCode: 403,
        message: "Access denied",
      });
    }
    next();
  };
};
