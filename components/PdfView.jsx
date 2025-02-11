"use client";
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PAGE_WIDTH = 580;
const PAGE_HEIGHT = 800;

const Pages = React.forwardRef(({ pageNumber, width }, ref) => {
  return (
    <div
      ref={ref}
      className="relative flex items-center bg-white shadow-md "
    >
      <Page
        pageNumber={pageNumber}
        scale={1}
        width={width}
      />
    </div>
  );
});

Pages.displayName = "Pages";

export default function MyBook({ fileUrl }) {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const bookRef = useRef();
  const [size, setSize] = useState({ height: 0, width: 0 });

  function getRectangleSize() {
    console.log(window.innerWidth, window.innerHeight);

    setSize({
      width: window.innerWidth * 0.30, // 60% of window width
      height: window.innerHeight * 0.85, // 30% of window height
    });
  }

  useEffect(() => {
    getRectangleSize();
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handlePageFlip = (e) => {
    setCurrentPage(e.data);
  };

  return (
    <div className="overflow-hidden border flex justify-center items-center">
      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        }
      >
        {numPages && (
          <HTMLFlipBook
            ref={bookRef}
            width={size.width}
            height={size.height}
            size="fixed"
            showCover={false}
            className="shadow-2xl h-full"
            drawShadow={true}
            usePortrait={false}
            autoSize={true}
            mobileScrollSupport={true}
            onFlip={handlePageFlip}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Pages key={index} width={size.width} pageNumber={index + 1} />
            ))}
          </HTMLFlipBook>
        )}
      </Document>

      {numPages && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white/80 px-3 py-1 rounded-full shadow-md text-sm">
          <p className="text-gray-700">
            Page {currentPage + 1} of {numPages}
          </p>
        </div>
      )}
    </div>
  );
}
