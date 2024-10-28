"use client";

import { useState } from "react";
import Image from "next/image";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function PredictionComponent(props) {
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(props.response);
  const [hfLora, setHfLora] = useState("");

  const handleResponseChange = (e) => {
    setResponse(e.target.value);
  };

  const handleHfLoraChange = (e) => {
    setHfLora(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: e.target.prompt.value,
        hfLora: hfLora,
      }),
    });
    let prediction = await response.json();
    if (response.status !== 201) {
      setError(prediction.detail);
      return;
    }
    setPrediction(prediction);

    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await sleep(1000);
      const response = await fetch("/api/predictions/" + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }
      console.log({ prediction: prediction });
      setPrediction(prediction);
    }
  };

  return (
    <div className="container max-w-2xl mx-auto p-5">
      <form className="w-full flex" onSubmit={handleSubmit}>
        <textarea
          value={response}
          onChange={handleResponseChange}
          name="prompt"
          rows={10}
          cols={50}
        ></textarea>
        <br />
        <br />
        <label>HF LoRA:</label>
        <br />
        <input type="text" value={hfLora} onChange={handleHfLoraChange} />
        <br />
        <br />
        <button className="button" type="submit">
          Go!
        </button>
      </form>

      {error && <div>{error}</div>}

      {prediction && (
        <>
          {prediction.output && (
            <div className="image-wrapper mt-5">
              <Image
                src={prediction.output[prediction.output.length - 1]}
                alt="output"
                sizes="100vw"
                height={768}
                width={768}
              />
            </div>
          )}
          <p className="py-3 text-sm opacity-50">status: {prediction.status}</p>
        </>
      )}
    </div>
  );
}
