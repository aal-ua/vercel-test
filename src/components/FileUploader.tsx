"use client";

import { useEffect, useState } from "react";

export default function FileUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<{ name: string; url: string }[]>([]);

  // Fetch previously uploaded files
  const fetchFiles = async () => {
    const response = await fetch("/api/list-files");
    const data = await response.json();
    setFiles(data.files || []);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  // Upload file to Vercel Blob
  const uploadFile = async () => {
    if (!file) return alert("Please select a file");

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.fileUrl) {
        alert("File uploaded successfully!");
        fetchFiles(); // Refresh file list
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-2">Upload a File</h2>
      <input type="file" onChange={handleFileChange} className="mb-2" />
      <button
        onClick={uploadFile}
        disabled={!file || uploading}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      <div className="mt-4">
        <h3 className="text-lg font-bold">Previously Uploaded Files:</h3>
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              <a href={file.url} target="_blank" className="text-blue-600">
                {file.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
