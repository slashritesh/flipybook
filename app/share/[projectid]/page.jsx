"use client";
import MyBook from "@/components/PdfView";
import { Button } from "@/components/ui/button";
import { appwrite } from "@/config";
import { createAdminClient, createClientSideClient } from "@/config/appwrite";
import { getFileUrl } from "@/lib/utils";
import { Code, Download } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  

const page = () => {
  const { projectid: fileid } = useParams();

  console.log(fileid);

  const { buckets } = appwrite;
  const { storage } = createClientSideClient();

  const handleDownloadFile = async () => {
    try {
      // Fetch the file from storage
      const file = await storage.getFileDownload(buckets.pdfs, fileid);
      console.log(file); // array buffer

      // Convert the array buffer to a Blob
      const blob = new Blob([file], { type: "application/pdf" });

      // Create a download link
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "Nuqi-Ethosphere-36-Edition.pdf"; // Specify the file name
      link.click(); // Trigger the download
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const url = getFileUrl(buckets.pdfs, fileid);
  return (
    <div className="h-screen relative bg-slate-900 flex-col flex items-center justify-center w-full">
        <div className="flex flex-col p-5 absolute top-0 gap-2 right-0">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
              className="bg-slate-800 rounded-md text-white p-2"
              onClick={handleDownloadFile}
              ><Download size={20} /></TooltipTrigger>
              <TooltipContent className='bg-white text-black'>
                <p>Download pdf</p>
              </TooltipContent>
            </Tooltip>
            
          </TooltipProvider>

          
        </div>
      <div className="p-2 relative">
      </div>
      <div className="overflow-hidden flex-col flex items-center justify-center">
        <MyBook fileUrl={url} />
      </div>
    </div>
  );
};

export default page;
