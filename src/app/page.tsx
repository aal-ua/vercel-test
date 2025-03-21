"use client";

import { useState } from "react";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUploadedFiles([...uploadedFiles, data.fileUrl]);
        setSelectedFile(null);
      } else {
        alert("File upload failed!");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred while uploading.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h1>File Sharing App</h1>
      <input type="file" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        disabled={!selectedFile || uploading}
        style={{
          marginLeft: "10px",
          cursor: selectedFile ? "pointer" : "not-allowed",
        }}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      <h2>Uploaded Files</h2>
      <ul>
        {uploadedFiles.map((file, index) => (
          <li key={index}>
            <a href={file} target="_blank" rel="noopener noreferrer">
              {file}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
