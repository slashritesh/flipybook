import { NextResponse } from "next/server";
import { ID } from "node-appwrite";
import { createAdminClient } from "@/config/appwrite";
import { appwrite } from "@/config";
import { getFileUrl } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function POST(req) {
  try {
    const { storage ,databases} = createAdminClient();
    const { buckets } = appwrite;
    const {getUser} = await getKindeServerSession()
    const user = await getUser()

    // Read file from request
    const data = await req.formData();
    const file = data.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Upload file to Appwrite storage
    const response = await storage.createFile(buckets.pdfs, ID.unique(), file);
    const fileUrl = getFileUrl(buckets.pdfs,response.$id)

    // create project in backend
    const newProject = await databases.createDocument(
      appwrite.databaseID,
      appwrite.collectionID,
      ID.unique(),
      {
        userid : user.id,
        filename: response.name,
        fileid: response.$id,
        fileurl: fileUrl,
      }
    );

    console.log(newProject);
    

    
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
