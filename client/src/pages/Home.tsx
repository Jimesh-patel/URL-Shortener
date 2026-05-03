import { useState } from "react";
import { createShortUrl } from "../api/url";

export default function Home() {
  const [url, setUrl] = useState("");
  const [short, setShort] = useState("");
  const backendUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost/api/url";

  const handleSubmit = async () => {
    const res = await createShortUrl(url);
    setShort(res.data.hash);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>URL Shortener</h2>

      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL"
      />

      <button onClick={handleSubmit}>Shorten</button>

      {short && (
        <div>
          Short URL:
          <a href={`${backendUrl}/${short}`}>
            {backendUrl}/{short}
          </a>
        </div>
      )}
    </div>
  );
}