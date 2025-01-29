"use client";
import React, { useState, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Pages = React.forwardRef(({ number, children }, ref) => {
  return (
    <div ref={ref} className="demoPage flex flex-col items-center bg-white shadow-lg">
      {children}
    </div>
  );
});

Pages.displayName = "Pages";

export default function MyBook() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const bookRef = useRef(); // Ref for HTMLFlipBook

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="flex w-screen overflow-hidden bg-slate-100 p-10 h-screen justify-center items-center">
      <Document file="demo.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        {numPages && (
          <HTMLFlipBook
            ref={bookRef}
            width={400}
            height={500}
            size="fixed"
            minWidth={315}
            usePortrait={true}
            maxWidth={600}
            minHeight={400}
            maxHeight={700}
            className="shadow-2xl rounded-lg border border-gray-300"
          >
            {[...Array(numPages)].map((_, index) => (
              <Pages key={index} number={index + 1}>
                <Page pageNumber={index + 1} width={400} />
              </Pages>
            ))}
          </HTMLFlipBook>
        )}
      </Document>

      {numPages && (
        <p className="absolute bottom-5 text-gray-600">
          Page {pageNumber} of {numPages}
        </p>
      )}
    </div>
  );
}
