import express from "express";
import cors from "cors";
import urlRoutes from "./routes/url.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/url", urlRoutes);

export default app;