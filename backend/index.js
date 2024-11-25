const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const errorHandler = require("./middlewares/errorHandler");
const userRoutes = require("./routes/userRoutes");
const appointmentsRoutes = require("./routes/appointmentsRoutes");
const sessionsRoutes = require("./routes/sessionsRoutes");
global.logger = require("./utils/logger");
app.use(cors());
app.use(express.json());
app.use(errorHandler);

// Serve static files from the "dist" directory (deployment only)
app.use(express.static(path.join(__dirname, "dist")));
app.use("/", userRoutes);
app.use("/", appointmentsRoutes);
app.use("/", sessionsRoutes);

// Catch uncaught exceptions
process.on("uncaughtException", (err) => {
  logger.error(`Uncaught Exception: ${err.message}`);
  process.exit(1); // Exit the process
});

// Catch unhandled promise rejections
process.on("unhandledRejection", (reason) => {
  logger.error(`Unhandled Rejection: ${reason}`);
});

require("dotenv").config(); // Load environment variables

const TESTDB = process.env.TEST_DB;
const REALDB = process.env.REAL_DB;

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
