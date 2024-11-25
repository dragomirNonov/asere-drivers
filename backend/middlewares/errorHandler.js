const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  logger.error(err);
  res.status(err.status || 500).json({
    title: "Server error",
    error: err.message,
  });
};

module.exports = errorHandler;
