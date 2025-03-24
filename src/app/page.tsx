"use client";

import FileUploader from "@/components/FileUploader";
// import { useState } from "react";

export default function Home() {
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  // const [uploading, setUploading] = useState<boolean>(false);

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files) {
  //     setSelectedFile(event.target.files[0]);
  //   }
  // };

  // const handleUpload = async () => {
  //   if (!selectedFile) {
  //     alert("Please select a file first!");
  //     return;
  //   }

  //   setUploading(true);

  //   const reader = new FileReader();
  //   reader.readAsDataURL(selectedFile);

  //   reader.onload = async () => {
  //     const fileData = reader.result; // Convert to Base64

  //     const response = await fetch("/api/upload", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ fileData, fileName: selectedFile.name }),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       setUploadedFiles([...uploadedFiles, data.fileUrl]);
  //     } else {
  //       alert("File upload failed!");
  //     }

  //     setUploading(false);
  //   };
  // };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <FileUploader />
      {/* 
      <h1>Blob File Sharing</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!selectedFile || uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>

      <h2>Uploaded Files</h2>
      <ul>
        {uploadedFiles.map((file, index) => (
          <li key={index}>
            <a href={file} download={`file-${index + 1}`}>
              Download File {index + 1}
            </a>
          </li>
        ))}
      </ul> */}
    </div>
  );
}
