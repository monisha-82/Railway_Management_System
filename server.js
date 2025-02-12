const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/trains", require("./routes/trainRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));

// https://chatgpt.com/share/67ab5e98-1654-800c-966c-12f40b7adda9