const db = require("../config/db");

exports.createUser = async (username, password, role) => {
    return db.query("INSERT INTO users (username, password, role) VALUES (?, ?, ?)", [username, password, role]);
};

exports.findUserByUsername = async (username) => {
    const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
    return rows.length > 0 ? rows[0] : null;
};
