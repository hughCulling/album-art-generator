"use client";

import { useState } from "react";

export default function TranscribeComponent() {
  const [audioFile, setAudioFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
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
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="audio/*" onChange={handleFileChange} />
        <button type="submit">Upload and Transcribe</button>
      </form>
      {loading && <p>Transcribing...</p>}
    </>
  );
}
