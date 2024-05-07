const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path"); // Import the path module

app.use(cors());
app.use(express.json());

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Serve static files from the "dist" directory
// app.use(express.static(path.join(__dirname, "dist"))); // deplyiment only
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Import the route handlers from userRoutes.js
const userRoutes = require("./routes/userRoutes");
const appointmentsRoutes = require("./routes/appointmentsRoutes");

// Use the route handlers
app.use("/", userRoutes);
app.use("/", appointmentsRoutes);

const url =
  "mongodb+srv://dragomirnonov:D27m03r94%21%40%23@aseredrivers.3tf7st7.mongodb.net/?retryWrites=true&w=majority&appName=AsereDrivers"; //test DB

// const url =
//   "mongodb+srv://dragomirnonov:D27m03r94%21%40%23@aseredrivers.3tf7st7.mongodb.net/AsereDrivers?retryWrites=true&w=majority&appName=AsereDrivers"; //REAL DB

mongoose
  .connect(url)
  .then(() => {
    console.log("Database connection Success!");
  })
  .catch((err) => {
    console.error("Mongo Connection Error", err);
  });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Serve the index.html file for any route not handled by API routes DEPLOY ONLY
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "dist", "index.html"));
// });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
