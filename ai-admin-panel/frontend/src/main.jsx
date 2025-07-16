import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ChatPanel from "./pages/ChatPanel";
import KnowledgeBase from "./pages/KnowledgeBase";
import Analytics from "./pages/Analytics";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <nav className="p-4 shadow-md flex gap-4">
        <Link to="/">Chat</Link>
        <Link to="/kb">Knowledge Base</Link>
        <Link to="/analytics">Analytics</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ChatPanel />} />
        <Route path="/kb" element={<KnowledgeBase />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
