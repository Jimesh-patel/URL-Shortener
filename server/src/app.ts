import express from "express";
import cors from "cors";
import urlRoutes from "./routes/url.routes";
import { errorHandler } from "./middleware/error.middleware";
import { limiter } from "./middleware/rateLimit.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.use(limiter);
app.use(errorHandler);
app.use("/api/url", urlRoutes);

export default app;