const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config(); // Load environment variables

const TESTDB = process.env.TEST_DB; // Test DB connection string
const REALDB = process.env.REAL_DB; // Real DB connection string

app.use(cors());
app.use(express.json());

// Serve static files from the "dist" directory (deployment only)
app.use(express.static(path.join(__dirname, "dist")));

// Import the route handlers
const userRoutes = require("./routes/userRoutes");
const appointmentsRoutes = require("./routes/appointmentsRoutes");
const sessionsRoutes = require("./routes/sessionsRoutes");

// Use the route handlers
app.use("/", userRoutes);
app.use("/", appointmentsRoutes);
app.use("/", sessionsRoutes);

// Choose the database URL based on the environment
const url = TESTDB;
// const url = REALDB;

mongoose
  .connect(url)
  .then(() => {
    console.log("Database connection success!");
  })
  .catch((err) => {
    console.error("Mongo Connection Error", err);
  });

// Serve the index.html file for any route not handled by API routes (deployment only)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
