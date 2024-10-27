"use client";

import { useState } from "react";

export default function PromptComponent(props) {
  const [transcription, setTranscription] = useState(props.transcription);

  // Handler for transcription text area changes
  const handleTranscriptionChange = (e) => {
    setTranscription(e.target.value);
  };

  return (
    <>
      <div>
        <h3>Transcription:</h3>
        <form>
          <textarea
            value={transcription}
            onChange={handleTranscriptionChange}
            rows={10}
            cols={50}
          ></textarea>
        </form>
      </div>
    </>
  );
}
