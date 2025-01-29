"use client";
import React, { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Pages = React.forwardRef(({ number, children }, ref) => {
  return (
    <div ref={ref} className="demoPage flex flex-col items-center bg-white shadow-lg p-4">
      {children}
    </div>
  );
});

Pages.displayName = "Pages";

export default function MyBook() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pagesPerView, setPagesPerView] = useState(2); // Default: 2 pages for large screens
  const bookRef = useRef();

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // Detect screen size and update layout
  useEffect(() => {
    const updateLayout = () => {
      setPagesPerView(window.innerWidth < 768 ? 1 : 2);
    };

    updateLayout(); // Initial check
    window.addEventListener("resize", updateLayout);
    
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  return (
    <div className="flex w-full h-full p-10">
      <Document file="demo.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        {numPages && (
          <HTMLFlipBook
            ref={bookRef}
            width={800}
            height={800}
            size="stretch"
            minWidth={315}
            maxWidth={600}
            minHeight={400}
            maxHeight={700}
            showCover={true}
            flippingTime={700}
            mobileScrollSupport={true}
            drawShadow={true}
            className="shadow-2xl h-fit rounded-lg border border-gray-300"
            startPage={0}
            maxShadowOpacity={0.5}
            usePortrait={false}
            startZIndex={1}
            clickEventForward={true}
            useMouseEvents={true}
            pagesPerView={pagesPerView} // Set dynamically based on screen width
          >
            {[...Array(numPages)].map((_, index) => (
              <Pages key={index} number={index + 1}>
                <Page pageNumber={index + 1} width={350} />
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
