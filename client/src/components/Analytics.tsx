import { useState } from "react";
import Card from "./Card";
import Input from "./Input";
import Button from "./Button";
import { getAnalytics } from "../api/url";

export default function Analytics() {
  const [hash, setHash] = useState("");
  const [data, setData] = useState<any>(null);

  const handleAnalytics = async () => {
    const res = await getAnalytics(hash);
    setData(res.data);
  };

  return (
    <Card title="Analytics">
      <div className="row">
        <Input
          value={hash}
          onChange={(e: any) => setHash(e.target.value)}
          placeholder="Enter hash..."
        />
        <Button onClick={handleAnalytics}>Fetch</Button>
      </div>

      {data && (
        <div className="analytics">
          <p><span>URL:</span> {data.originalUrl}</p>
          <p><span>Visits:</span> {data.visits}</p>
          <p><span>Created:</span> {new Date(data.createdAt).toLocaleString()}</p>
        </div>
      )}
    </Card>
  );
}