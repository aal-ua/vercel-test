import { NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";

// Define upload directory
const uploadDir = path.join(process.cwd(), "public/uploads");

// Ensure the upload directory exists
async function ensureUploadDir() {
  try {
    await mkdir(uploadDir, { recursive: true });
  } catch (error) {
    console.error("Error creating upload directory:", error);
  }
}

// Handle file upload
export async function POST(req: Request) {
  await ensureUploadDir();

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const fileBuffer = await file.arrayBuffer();
  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(uploadDir, fileName);

  await writeFile(filePath, Buffer.from(fileBuffer));

  return NextResponse.json({ fileUrl: `/uploads/${fileName}` }, { status: 200 });
}
