const db = require("../config/db");

exports.createBooking = async (user_id, train_id) => {
    return db.query("INSERT INTO bookings (user_id, train_id) VALUES (?, ?)", [user_id, train_id]);
};

exports.getBookingsByUser = async (user_id) => {
    const [rows] = await db.query(
        "SELECT b.id, t.name, t.source, t.destination FROM bookings b JOIN trains t ON b.train_id = t.id WHERE b.user_id = ?",
        [user_id]
    );
    return rows;
};
