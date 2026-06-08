const {
  checkDatabaseConnection,
  getMissingDbVars,
} = require("../../models/db.model");

async function healthCheck(req, res, next) {
  try {
    await checkDatabaseConnection();
    return res.json({
      success: true,
      message: "Database connection successful",
    });
  } catch (error) {
    return next(error);
  }
}

async function dbCheck(req, res) {
  const missingDbVars = getMissingDbVars();

  if (missingDbVars.length > 0) {
    return res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: `Missing required database environment variables: ${missingDbVars.join(", ")}`,
    });
  }

  try {
    await checkDatabaseConnection();
    return res.json({
      success: true,
      message: "Database connection is working",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message,
    });
  }
}

module.exports = {
  healthCheck,
  dbCheck,
};
