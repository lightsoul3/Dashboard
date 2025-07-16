import React, { useState } from "react";
import axios from "axios";

export default function ChatPanel() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);

  const send = async () => {
    if (!query.trim()) return;
    const { data } = await axios.post("/api/chat", { query });
    setMessages(prev => [...prev, { role: "user", content: query }, { role: "assistant", content: data.answer }]);
    setQuery("");
  };

  return (
    <div className="p-4">
      <div className="border h-96 overflow-y-auto mb-4 p-2 rounded">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
            <span className={m.role === "user" ? "bg-blue-100 p-1 rounded" : "bg-gray-100 p-1 rounded"}>{m.content}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input className="flex-1 border p-2 rounded" value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key==='Enter' && send()} placeholder="Ask a question..." />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={send}>Send</button>
      </div>
    </div>
  );
}
