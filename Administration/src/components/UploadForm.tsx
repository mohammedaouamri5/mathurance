"use client";

import { useState, ChangeEvent } from "react";
import axios from 'axios';

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post<{ message: string }>(
        "http://127.0.0.1:6000/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error uploading file");
      console.error("Upload error:", error);
    }
  };

  return (
<div className="flex flex-col items-center justify-center w-full max-w-md p-6 bg-white shadow-lg rounded-2xl border border-gray-200 h-80">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upload Your File</h2>

      <input
        type="file"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 file:text-gray-700 hover:file:bg-gray-100 cursor-pointer"
      />

      <button
        onClick={handleUpload}
        className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        Upload
      </button>

      {message && <p className="mt-4 text-gray-700 text-sm">{message}</p>}
    </div>
  );
}
