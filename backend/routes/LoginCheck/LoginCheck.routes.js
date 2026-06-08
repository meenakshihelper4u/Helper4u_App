const express = require("express");
const { LoginCheck } = require("./LoginCheck.controller");

const router = express.Router();

router.post("/LoginCheck", LoginCheck);


module.exports = router;
