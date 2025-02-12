const db = require("../config/db");

exports.createTrain = async (name, source, destination, total_seats) => {
    return db.query(
        "INSERT INTO trains (name, source, destination, total_seats, available_seats) VALUES (?, ?, ?, ?, ?)",
        [name, source, destination, total_seats, total_seats]
    );
};

exports.getTrainsByRoute = async (source, destination) => {
    const [rows] = await db.query("SELECT * FROM trains WHERE source = ? AND destination = ?", [source, destination]);
    console.log(rows);
    return rows;
};

exports.getTrainById = async (train_id) => {
    const [rows] = await db.query("SELECT * FROM trains WHERE id = ?", [train_id]);
    return rows.length > 0 ? rows[0] : null;
};

exports.updateSeats = async (train_id, available_seats) => {
    return db.query("UPDATE trains SET available_seats = ? WHERE id = ?", [available_seats, train_id]);
};
