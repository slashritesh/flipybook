import MyBook from "@/components/PdfView";
import { appwrite } from "@/config";
import { getFileUrl } from "@/lib/utils";
import React from "react";

const page = async ({params}) => {
  const { projectid } = await params;
  const { buckets } = appwrite;

  const url = getFileUrl(buckets.pdfs, projectid);
  return (
    <div className="h-screen flex items-center justify-center w-full">
      <MyBook fileUrl={url} />
    </div>
  );
};

export default page;
