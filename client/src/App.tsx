import Shortener from "./components/Shortener";
import Analytics from "./components/Analytics";
import "./App.css";

export default function App() {
  const baseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  return (
    <div className="app">
      <h1>🔗 URL Shortener</h1>

      <Shortener baseUrl={baseUrl} />
      <Analytics />
    </div>
  );
}