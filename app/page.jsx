import Navbar from "@/components/Navbar";
import { Upload } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <main>
      <Navbar />
      <section className="h-[90vh] bg-gradient-to-b from-white  to-blue-300">
        <div className="px-20 flex justify-center items-center flex-col">
          <h1 className="text-5xl mt-14 font-medium text-center">
            Convert Your Pdf Into <br /> Interactive Flipbook In Mins
          </h1>
          <div className="py-10">
            <div className="h-[450px] w-[800px]  bg-gradient-to-t from-slate-200 to-blue-50 border rounded-2xl"></div>
          </div>
        </div>
      </section>
      <section className="my-[230px]">
        <div className="px-20 flex flex-col items-center">
          <div className="text-sm font-medium p-2 rounded-full px-6 bg-gradient-to-tr from-blue-600 to-cyan-500 text-white border mb-5">
            Guide - How to Make
          </div>
          <h1 className="font-medium capitalize text-4xl">
            Just 3 Steps to make your flipbook
          </h1>
          <div className="grid my-10 grid-cols-3 w-full gap-5">
            <div className="p-9 hover:bg-slate-100 rounded-2xl gap-4 flex flex-col items-center">
              <div className="p-5 rounded-xl  bg-blue-600 text-white">
                <Upload />
              </div>
              <h3 className="text-2xl font-semibold">1. Upload Document</h3>
              <p className="text-slate-400 font-medium text-sm text-center" >Lorem ipsum dolor sectetur adipisicing elit. Soluta fugit accusantium quae.</p>
            </div>
            <div className="p-9 hover:bg-slate-100 rounded-2xl gap-4 flex flex-col items-center">
              <div className="p-5 rounded-xl  bg-blue-600 text-white">
                <Upload />
              </div>
              <h3 className="text-2xl font-semibold">2. Edit Document</h3>
              <p className="text-slate-400 font-medium text-sm text-center" >Lorem ipsum dolor sectetur adipisicing elit. Soluta fugit accusantium quae.</p>
            </div>
            <div className="p-9 hover:bg-slate-100 rounded-2xl gap-4 flex flex-col items-center">
              <div className="p-5 rounded-xl  bg-blue-600 text-white">
                <Upload />
              </div>
              <h3 className="text-2xl font-semibold">3. Publish & share</h3>
              <p className="text-slate-400 font-medium text-sm text-center" >Lorem ipsum dolor sectetur adipisicing elit. Soluta fugit accusantium quae.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
