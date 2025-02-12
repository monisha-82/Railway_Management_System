const { createTrain } = require("../models/trainModel");

exports.addTrain = async (req, res) => {
    const { name, source, destination, total_seats } = req.body;

    try {
        await createTrain(name, source, destination, total_seats);
        res.status(201).json({ message: "Train added successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
