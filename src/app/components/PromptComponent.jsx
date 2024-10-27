"use client";

import { useState } from "react";
import PredictionComponent from "./PredictionComponent";

export default function PromptComponent(props) {
  const [transcription, setTranscription] = useState(props.transcription);
  const [response, setResponse] = useState("");

  // Handler for transcription text area changes
  const handleTranscriptionChange = (e) => {
    setTranscription(e.target.value);
  };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        console.log(`transcription = ${JSON.stringify({ transcription })}`);
    
        // Send the lyrics to the API route
        const res = await fetch("/api/gemini", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ transcription }),
        });
    
        const data = await res.json();
        setResponse(data.response); // Update the state with the API response
      };

  return (
    <>
      <div>
        <h2>Transcription:</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={transcription}
            onChange={handleTranscriptionChange}
            rows={10}
            cols={50}
          ></textarea>
          <br />
          <button type="submit">Submit</button>
        </form>
        {response && (
          <div>
            <h2>Response from Gemini:</h2>
            <p>{response}</p>
            <PredictionComponent />
          </div>
        )}
      </div>
    </>
  );
}
