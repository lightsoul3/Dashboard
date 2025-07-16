import React, { useEffect, useState } from "react";
import axios from "axios";

export default function KnowledgeBase() {
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    const { data } = await axios.get("/api/kb/list");
    setFiles(data.files);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const upload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    await axios.post("/api/kb/upload", formData);
    fetchFiles();
  };

  const remove = async (file_id) => {
    await axios.delete("/api/kb/" + file_id);
    fetchFiles();
  };

  return (
    <div className="p-4">
      <input type="file" onChange={upload} className="mb-4" />
      <ul>
        {files.map(f => (
          <li key={f} className="flex justify-between items-center border-b py-1">
            {f}
            <button onClick={() => remove(f)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
