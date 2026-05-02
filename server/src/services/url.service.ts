import { Url } from "../models/url.model";
import { redisClient } from "../config/redis";

const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const generateShortId = (): string => {
  let id = "";
  for (let i = 0; i < 6; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
};

export const createShortUrlService = async (originalUrl: string) => {
  const hash = generateShortId();

  const url = await Url.create({ hash, originalUrl });

  await redisClient.set(hash, originalUrl);

  return url;
};

export const getLongUrlService = async (hash: string) => {
  
  const cached = await redisClient.get(hash);
  if (cached) {
    return { hash, originalUrl: cached };
  }

  const url = await Url.findOne({ hash });

  if (!url) return null;

  await redisClient.set(hash, url.originalUrl);

  return url;
};