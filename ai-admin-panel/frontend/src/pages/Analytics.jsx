import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function Analytics() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/api/analytics/usage").then(res => setData(res.data));
  }, []);

  return (
    <div className="p-4 h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp"/>
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="tokens" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
