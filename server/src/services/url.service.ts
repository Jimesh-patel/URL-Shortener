import { Url } from "../models/url.model";
import { redisClient } from "../config/redis";
import { getNextToken } from "./id.service";

const base62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const encode = (num: number): string => {
  let str = "";
  while (num > 0) {
    str = base62[num % 62] + str;
    num = Math.floor(num / 62);
  }
  return str;
};

const CACHE_TTL = 60 * 60;

export const createShortUrlService = async (originalUrl: string) => {

  const existing = await Url.findOne({ originalUrl });
  if (existing) return existing.hash;

  try{

    const token = await getNextToken();
    const hash = encode(token);

    const url = await Url.create({ hash, originalUrl });

    await redisClient.set(hash, originalUrl, {
      EX: CACHE_TTL
    });

    return url.hash;
  } catch (error: any) {
    console.error("Error creating short URL:", error);
    throw error;
  }
};

export const getLongUrlService = async (hash: string) => {
  try{
    
    const cached = await redisClient.get(hash);

    if (cached) {
      // cache hit 
      // still increment visits in DB (async, non-blocking)
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
  } catch (error: any) {
    console.error("Error retrieving long URL:", error);
    throw error;
  }
};