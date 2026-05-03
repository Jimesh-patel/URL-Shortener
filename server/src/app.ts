import express from "express";
import cors from "cors";
import urlRoutes from "./routes/url.routes";
import { errorHandler } from "./middleware/error.middleware";
import { limiter } from "./middleware/rateLimit.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.use(limiter);

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    pid: process.pid,
    host: require("os").hostname()
  });
});

app.use("/api/url", urlRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);

export default app;