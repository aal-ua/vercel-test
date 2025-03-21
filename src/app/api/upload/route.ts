import { NextResponse } from "next/server";

export const runtime = "nodejs"; // Allows files up to 5MB (not Edge Functions)

export async function POST(req: Request) {
  try {
    const { fileData } = await req.json();

    if (!fileData) {
      return NextResponse.json({ error: "No file received" }, { status: 400 });
    }

    // Return the file URL (Base64 format)
    return NextResponse.json({ fileUrl: fileData }, { status: 200 });

  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
