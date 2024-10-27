import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Make sure to include these imports:
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req) {
  const { transcription } = await req.json();

  if (!transcription) {
    return NextResponse.json({ error: "Lyrics not provided" }, { status: 400 });
  }

  // Prepare the prompt for Gemini API
  const prompt = `Write a single prompt for an art generator to create album art, ensuring the artist represented by the keyword lm is included as the central figure. Base the prompt on these lyrics: "${transcription}". Please provide the response in plain text without using Markdown formatting.`;

  try {
    const result = await model.generateContent(prompt);
    console.log(result.response.text());

    // Send the response back to the client
    return NextResponse.json({ response: result.response.text() });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return NextResponse.json({ error: "Failed to call API" }, { status: 500 });
  }
}
