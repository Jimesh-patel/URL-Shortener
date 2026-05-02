import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";
import { connectRedis } from "./config/redis";
import { connectZookeeper } from "./config/zookeeper";
import { initCounter } from "./services/zk.service";


const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  await connectRedis();
  await connectZookeeper();
  await initCounter();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();