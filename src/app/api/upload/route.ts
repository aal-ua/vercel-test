import { NextResponse } from "next/server";

export const runtime = "edge"; // Ensures it runs on Vercel Edge Functions

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const buffer = await file.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");
  const mimeType = file.type;

  const fileUrl = `data:${mimeType};base64,${base64}`;

  return NextResponse.json({ fileUrl }, { status: 200 });
}
