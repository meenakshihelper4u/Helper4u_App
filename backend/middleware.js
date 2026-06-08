const rateLimit = require("express-rate-limit");

const dailyContactLimit = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 25,
  message: {
    success: false,
    error: "Too many requests, you have reached your daily limit",
    code: "RATE_LIMIT_EXCEEDED",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

function notFound(req, res, next) {
  res.status(404);
  next(new Error(`Not Found - ${req.originalUrl}`));
}

function errorHandler(err, req, res, next) {
  if (err.status === 429) {
    return res.status(429).json({
      success: false,
      error: err.message || "Too many requests",
      code: "RATE_LIMIT_EXCEEDED",
    });
  }

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Server error",
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
}

module.exports = {
  notFound,
  errorHandler,
  dailyContactLimit,
};
