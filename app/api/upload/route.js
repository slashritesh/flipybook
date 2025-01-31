import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // 1. Read the file from the request body
    const data = await req.formData();
    const file = data.get("file"); // Get the file object from FormData

    console.log(file);
    

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // 2. Convert file stream to a buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 3. Define the upload directory (public/pdf)
    const uploadDir = path.join(process.cwd(), "public/pdf");

    // 4. Ensure the directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // 5. Clear existing files in the directory
    fs.readdirSync(uploadDir).forEach((file) => {
      fs.unlinkSync(path.join(uploadDir, file));
    });

    // 6. Save the file as demo.pdf in the public/pdf directory
    const filePath = path.join(uploadDir, "demo.pdf");
    fs.writeFileSync(filePath, buffer);

    console.log("done");
    

    return NextResponse.json({ message: "File uploaded successfully" }, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
