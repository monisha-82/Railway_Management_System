const db = require("../config/db");
const { getTrainsByRoute, getTrainById, updateSeats } = require("../models/trainModel");
const { createBooking, getBookingsByUser } = require("../models/bookingModel");

exports.getSeatAvailability = async (req, res) => {
    const { source, destination } = req.body;
    const trains = await getTrainsByRoute(source, destination);

    if (trains.length === 0) {
        return res.status(404).json({ message: "No trains found on this route" });
    }

    res.json(trains);
};

exports.bookSeat = async (req, res) => {
    const { train_id } = req.body;
    const user_id = req.user.id;

    try {
        await db.query("START TRANSACTION");

        const [train] = await db.query("SELECT available_seats FROM trains WHERE id = ? FOR UPDATE", [train_id]);

        if (train.length === 0) {
            await db.query("ROLLBACK");
            return res.status(404).json({ message: "Train not found" });
        }

        if (train[0].available_seats <= 0) {
            await db.query("ROLLBACK");
            return res.status(400).json({ message: "No seats available" });
        }

        await createBooking(user_id, train_id);
        await updateSeats(train_id, train[0].available_seats - 1);

        await db.query("COMMIT");
        res.json({ message: "Booking successful" });
    } catch (err) {
        await db.query("ROLLBACK");
        res.status(500).json({ error: err.message });
    }
};

exports.getBookings = async (req, res) => {
    const user_id = req.user.id;
    const bookings = await getBookingsByUser(user_id);
    res.json(bookings);
};
