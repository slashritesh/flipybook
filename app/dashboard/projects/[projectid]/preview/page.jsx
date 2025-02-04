import MyBook from "@/components/PdfView";
import { Button, buttonVariants } from "@/components/ui/button";
// import MyBook from '@/components/Sample'
import { appwrite } from "@/config";
import { createAdminClient } from "@/config/appwrite";
import { getFileUrl } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const page = async ({ params }) => {
  const { projectid } = await params;
  const { buckets } = appwrite;

  const url = getFileUrl(buckets.pdfs, projectid);

  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <Link href={`/share/${projectid}`} className={buttonVariants({ variant: "" })}>
          Open Public Link
        </Link>
      </div>
      <MyBook fileUrl={url} />
    </div>
  );
};

export default page;
