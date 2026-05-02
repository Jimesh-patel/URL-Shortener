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

const CACHE_TTL = 60 * 60;

export const createShortUrlService = async (originalUrl: string) => {
  const hash = generateShortId();

  const url = await Url.create({ hash, originalUrl });

  await redisClient.set(hash, originalUrl, {
    EX: CACHE_TTL
  });

  return url;
};

export const getLongUrlService = async (hash: string) => {
  
  const cached = await redisClient.get(hash);

  if (cached) {
    // cache hit → still increment visits in DB (async, non-blocking)
    Url.updateOne({ hash }, { $inc: { visits: 1 } }).exec();
    return { hash, originalUrl: cached };
  }

  // DB fallback + atomic increment
  const url = await Url.findOneAndUpdate(
    { hash },
    { $inc: { visits: 1 } },
    { new: true }
  );

  if (!url) return null;

  await redisClient.set(hash, url.originalUrl, {
    EX: CACHE_TTL
  });

  return url;
};