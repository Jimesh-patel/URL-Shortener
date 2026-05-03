import { useState } from "react";
import Card from "./Card";
import Input from "./Input";
import Button from "./Button";
import { createShortUrl } from "../api/url";

export default function Shortener({ baseUrl }: any) {
  const [url, setUrl] = useState("");
  const [short, setShort] = useState("");

  const handleShorten = async () => {
    const res = await createShortUrl(url);
    setShort(res.data.hash);
  };

  return (
    <Card title="Create Short URL">
      <div className="row">
        <Input
          value={url}
          onChange={(e: any) => setUrl(e.target.value)}
          placeholder="Enter URL..."
        />
        <Button onClick={handleShorten}>Shorten</Button>
      </div>

      {short && (
        <div className="result-box">
            <p className="label">Short URL</p>
            <div className="highlight">
                <a href={`${baseUrl}/${short}`} target="_blank">
                {baseUrl}/{short}
                </a>
            </div>

            <p className="label">Hash</p>
            <div className="hash">{short}</div>
        </div>
      )}
    </Card>
  );
}