import { Request, Response } from "express";
import { createShortUrlService, getLongUrlService } from "../services/url.service";
import { CreateUrlDto, RedirectParamsDto } from "../dtos/url.dto";

// POST /api/url
export const createShortUrl = async (
  req: Request<{}, {}, CreateUrlDto>,
  res: Response
) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ message: "originalUrl is required" });
    }

    const hash = await createShortUrlService(originalUrl);

    return res.status(201).json({
      hash: hash,
      originalUrl: originalUrl
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// GET /api/url/:hash
export const redirectUrl = async (
  req: Request<RedirectParamsDto>,
  res: Response
) => {
  try {
    const { hash } = req.params;

    if (!hash) {
      return res.status(400).json({ message: "Invalid hash" });
    }

    const url = await getLongUrlService(hash);

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    return res.redirect(url.originalUrl);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};