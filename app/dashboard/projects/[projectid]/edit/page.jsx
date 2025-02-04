import MyBook from "@/components/PdfView";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { appwrite } from "@/config";
import { cn, getFileUrl } from "@/lib/utils";
import { Globe, X } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = async ({ params }) => {
  const { projectid } = await params;
  const { buckets } = appwrite;

  const url = getFileUrl(buckets.pdfs, projectid);

  return (
    <div className="flex mx-10 gap-5">
      <div className="w-[250px] h-fit rounded-lg border p-5">
        <h2 className="font-medium text-lg">Edit Settings</h2>
        <form className="mt-5 flex flex-col gap-2">
          <div>
            <Label>Background Color</Label>
            <input
              name="bgColor"
              type="color"
              className="w-full rounded-lg h-10 colorp outline-none"
            />
          </div>
          <div>
            <Label>Page Size</Label>
            <div className="flex mt-2 gap-2">
              <Input type="number" placeholder="width" />
              <Input type="number" placeholder="height" />
            </div>
          </div>
          <Button className='mt-2 w-full'>Save Changes</Button>
        </form>
      </div>
      <div className="flex relative justify-center rounded-lg p-10 items-center border flex-1">
        <Link
          href={`/share/${projectid}`}
          target="_blank"
          className={cn(
            buttonVariants({ size: "sm" }),
            "absolute right-5 z-40 top-5"
          )}
        >
          <Globe /> Share Link
        </Link>
        <div className="">
          <MyBook fileUrl={url} />
        </div>
      </div>
    </div>
  );
};

export default page;
