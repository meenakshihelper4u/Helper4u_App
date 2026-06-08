require("dotenv").config();

const knex = require("knex");
const knexConfig = require("../knexfile");

const requiredDbVars = ["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME"];

function getMissingDbVars() {
  return requiredDbVars.filter((key) => !process.env[key]);
}

function createDbConnection() {
  const missingDbVars = getMissingDbVars();

  if (missingDbVars.length > 0) {
    return null;
  }

  return knex(knexConfig);
}

const db = createDbConnection();

async function checkDatabaseConnection() {
  const missingDbVars = getMissingDbVars();

  if (missingDbVars.length > 0) {
    throw new Error(
      `Missing required database environment variables: ${missingDbVars.join(", ")}`
    );
  }

  if (!db) {
    throw new Error("Database connection is not initialized");
  }

  await db.raw("SELECT 1 AS ok");
  return true;
}

module.exports = {
  db,
  knex: db,
  checkDatabaseConnection,
  getMissingDbVars,
};
