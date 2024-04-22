const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

// Import the route handlers from userRoutes.js
const userRoutes = require("./routes/userRoutes");

// Use the route handlers
app.use("/", userRoutes);

const url =
  "mongodb+srv://dragomirnonov:D27m03r94%21%40%23@aseredrivers.3tf7st7.mongodb.net/?retryWrites=true&w=majority&appName=AsereDrivers";

mongoose
  .connect(url)
  .then(() => {
    console.log("Database connection Success!");
  })
  .catch((err) => {
    console.error("Mongo Connection Error", err);
  });

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
