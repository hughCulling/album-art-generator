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

    return NextResponse.json({
      transcription: "Wahey",
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
