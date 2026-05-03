import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost/api/url", 
});

export const createShortUrl = (originalUrl: string) =>
  API.post("/", { originalUrl });

export const getAnalytics = (hash: string) =>
  API.get(`/${hash}/analytics`);