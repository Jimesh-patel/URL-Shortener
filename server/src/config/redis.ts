import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  console.log("REDIS_URL : ", redisUrl);
  throw new Error("REDIS_URL is not defined in environment variables");
}

export const redisClient = createClient({
  url: redisUrl
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

export const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log("Redis connected");
  } catch (error) {
    console.error("Redis connection failed:", error);
  }
};