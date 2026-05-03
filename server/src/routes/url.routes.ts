import { Router } from "express";
import { createShortUrl, redirectUrl, getUrlAnalytics } from "../controllers/url.controller";

const router = Router();

router.post("/", createShortUrl);
router.get("/:hash/analytics", getUrlAnalytics);
router.get("/:hash", redirectUrl);

export default router;