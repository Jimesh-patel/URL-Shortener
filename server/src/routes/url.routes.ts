import { Router } from "express";
import { createShortUrl, redirectUrl } from "../controllers/url.controller";

const router = Router();

router.post("/", createShortUrl);
router.get("/:hash", redirectUrl);

export default router;