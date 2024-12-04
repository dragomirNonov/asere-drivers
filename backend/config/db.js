const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const dbURI =
      process.env.NODE_ENV === "production"
        ? process.env.MONGO_URI_PROD
        : process.env.MONGO_URI_DEV;

    await mongoose.connect(dbURI);
    console.log(
      `MongoDB connected successfully to ${process.env.NODE_ENV} database.`
    );
  } catch (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
