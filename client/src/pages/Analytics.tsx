import { useState } from "react";
import { getAnalytics } from "../api/url";

export default function Analytics() {
  const [hash, setHash] = useState("");
  const [data, setData] = useState<any>(null);

  const fetchData = async () => {
    const res = await getAnalytics(hash);
    setData(res.data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Analytics</h2>

      <input
        value={hash}
        onChange={(e) => setHash(e.target.value)}
        placeholder="Enter hash"
      />

      <button onClick={fetchData}>Get Analytics</button>

      {data && (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}