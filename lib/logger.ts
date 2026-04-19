import pino from "pino";

export const logger = pino({
  name: "portfolio-platform",
  level: process.env.NODE_ENV === "development" ? "debug" : "info",
});
