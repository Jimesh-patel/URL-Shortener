
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Analytics from "./pages/Analytics";
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/analytics">Analytics</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
