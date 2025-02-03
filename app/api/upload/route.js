import { NextResponse } from "next/server";
import { ID } from "node-appwrite";
import { createAdminClient } from "@/config/appwrite";
import { appwrite } from "@/config";

export async function POST(req) {
  try {
    const { storage } = createAdminClient();
    const { buckets } = appwrite;

    // Read file from request
    const data = await req.formData();
    const file = data.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Upload file to Appwrite storage
    const response = await storage.createFile(buckets.pdfs, ID.unique(), file);

    const url = await storage.getFilePreview(buckets.pdfs,response.$id)

    console.log("file url : ",url.byteLength);
    

    console.log("File uploaded successfully:", response);
    return NextResponse.json(
      { message: "File uploaded successfully", fileId: response.$id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload error:", error.message);
    return NextResponse.json(
      { error: "File upload failed", details: error.message },
      { status: 500 }
    );
  }
}
