const express = require("express");
const { addTrain } = require("../controllers/trainController");
const { verifyAdmin } = require("../middlewares/auth");
const router = express.Router();

router.post("/add", verifyAdmin, addTrain);

module.exports = router;
