import { Url } from "../models/url.model";

const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const generateShortId = (): string => {
  let id = "";
  for (let i = 0; i < 6; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
};

export const createShortUrlService = async (longUrl: string) => {
  const shortId = generateShortId();

  const url = await Url.create({
    hash: shortId,
    originalUrl: longUrl
  });

  return url;
};

export const getLongUrlService = async (hash: string) => {
  return Url.findOne({ hash });
};