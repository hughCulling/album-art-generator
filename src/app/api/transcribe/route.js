import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const data = await request.formData();
    const file = data.get("audio");

    console.log(`file = ${file}`);

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate file type (optional but recommended)
    if (!file.type.startsWith("audio/")) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    try {
      // Make the API request with the file
      const response = await fetch(
        "https://api-inference.huggingface.co/models/openai/whisper-large-v3",
        {
          headers: {
            Authorization: `Bearer ${process.env.HF_ACCESS_TOKEN}`, // Make sure your token is correct
            "Content-Type": "application/json",
          },
          method: "POST",
          body: file,
        }
      );

      // Check if the request was successful
      if (!response.ok) {
        console.error(
          `HTTP Error: ${response.status} - ${response.statusText}`
        );
      }

      // Parse and log the response
      const result = await response.json();
      console.log("Parsed JSON Response:", result);
      return NextResponse.json({
        transcription: result.text,
      });
    } catch (error) {
      console.error("Error during API request:", error);
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
