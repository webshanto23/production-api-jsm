import logger from "#config/logger";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "#routes/auth.routes";
import securityMiddleware from "#middlewares/security.middleware";
import usersRoutes from "#routes/users.routes";
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// HTTP request logger middleware
app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  }),
);

app.use(securityMiddleware);

// Root endpoint
app.get("/", (req, res) => {
  logger.info("Hello from Production API JSM! Root endpoint accessed.");
  res.status(200).send("Hello from the Express.js server!");
});

// Health check endpoint
app.use("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API base endpoint
app.get("/api", (req, res) => {
  res.status(200).json({ message: "Production Api is running!" });
});

// Auth routes
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

export default app;
