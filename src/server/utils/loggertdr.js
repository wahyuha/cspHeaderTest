const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const moment = require("moment-timezone");
const logform = require("logform");
const path = require("path");

const { combine, printf } = logform.format;

moment.tz.setDefault("Asia/Jakarta");
const os = require("os");

const hostname = os.hostname();
const transport = new DailyRotateFile({
  dirname: process.env.SAPPER_APP_LOGS_PATH,
  filename: path.join("logs", `AUTH_TDR_${hostname}_%DATE%.log`),
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxFiles: "14d",
  level: "info",
  timestamp: true,
});
const isLogToFile = process.env.SAPPER_APP_LOG_TO_FILE === "true";

const loggerTdr = winston.createLogger({
  format: combine(
    printf((info) => {
      return `${info.message}`;
    })
  ),
  transports: [isLogToFile ? transport : new winston.transports.Console()],
});

export default loggerTdr;
