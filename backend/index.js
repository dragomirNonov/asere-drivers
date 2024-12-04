const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
const logger = require("./utils/logger");

dotenv.config();

// Initialize Express app
const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require("./routes/userRoutes");
const appointmentsRoutes = require("./routes/appointmentsRoutes");
const sessionsRoutes = require("./routes/sessionsRoutes");

// API Routes
app.use("/api/users/", userRoutes);
app.use("/api/appointments/", appointmentsRoutes);
app.use("/api/sessions/", sessionsRoutes);

// Production setup - must come AFTER API routes
if (process.env.NODE_ENV === "production") {
  // Serve static files
  app.use(express.static(path.join(__dirname, "dist")));

  // Handle React routing
  app.get("*", (req, res) => {
    if (req.url.startsWith("/api")) {
      return res.status(404).send("API endpoint not found");
    }
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
}

// Error handling middleware should be last
app.use(errorHandler);

// Catch uncaught exceptions
process.on("uncaughtException", (err) => {
  logger.error(`Uncaught Exception: ${err.message}`);
  process.exit(1); // Exit process
});

// Catch unhandled promise rejections
process.on("unhandledRejection", (reason) => {
  logger.error(`Unhandled Rejection: ${reason}`);
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

module.exports = app;
