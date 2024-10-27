"use client";

import { useState } from "react";
import PromptComponent from "./PromptComponent";

export default function TranscribeComponent() {
  const [audioFile, setAudioFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [transcription, setTranscription] = useState("");

    // Maximum file size in bytes (1MB = 1048576 bytes)
    const MAX_FILE_SIZE = 4.5 * 1048576; // 4.5MB limit

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];

        if (file.size > MAX_FILE_SIZE) {
            e.target.value = ''; // Reset file input
            alert(`File size must be less than ${MAX_FILE_SIZE/1048576}MB`);
            return;
          }

      setAudioFile(e.target.files[0]);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!audioFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("audio", audioFile);

    setLoading(true);

    try {
        const res = await fetch("/api/transcribe", {
          method: "POST",
          body: formData,
        });
  
        const result = await res.json();
  
        if (res.ok) {
          alert("File uploaded successfully!");
          setTranscription(result.transcription);
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        alert(`Upload failed: ${error.message}`);
        console.error("Error uploading file:", error);
      } finally {
        setLoading(false);
      }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <p>Maximum file size: {MAX_FILE_SIZE/1048576}MB</p>
        <input type="file" accept="audio/*" onChange={handleFileChange} />
        <button type="submit" disabled={!audioFile || loading}>{loading ? "Processing..." : "Upload and Transcribe"}
        </button>
      </form>
      {loading && <p>Transcribing...</p>}
      {transcription && <PromptComponent transcription={transcription} />}
    </>
  );
}
