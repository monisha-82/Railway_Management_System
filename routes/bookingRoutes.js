const express = require("express");
const { getSeatAvailability, bookSeat, getBookings } = require("../controllers/bookingController");
const { verifyToken } = require("../middlewares/auth");

const router = express.Router();

router.post("/availability", getSeatAvailability);
router.post("/book", verifyToken, bookSeat);
router.get("/my-bookings", verifyToken, getBookings);

module.exports = router;