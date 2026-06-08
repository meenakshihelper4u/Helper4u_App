const express = require("express");
const {
  healthCheck,
  dbCheck,
} = require("./database.controller");

const router = express.Router();

router.get("/health", healthCheck);
router.get("/db-check", dbCheck);

module.exports = router;
