const { createLogger, format, transports } = require("winston");
require("winston-daily-rotate-file");

const dailyRotateFileTransport = new transports.DailyRotateFile({
  filename: "logs/app-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxFiles: "14d",
});

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({
      format: () => new Date().toLocaleString(), // Local time
    }),
    format.printf(
      ({ timestamp, level, message }) =>
        `${timestamp} [${level.toUpperCase()}]: ${message}`
    )
  ),
  transports: [new transports.Console(), dailyRotateFileTransport],
});

module.exports = logger;
