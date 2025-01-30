"use client";
import React, { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Pages = React.forwardRef(({ pageNumber }, ref) => {
  return (
    <div
      ref={ref}
      className="relative bg-white shadow-md"
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Page
        pageNumber={pageNumber}
        className=""
        renderTextLayer={true}
        renderAnnotationLayer={true}
      />
    </div>
  );
});

Pages.displayName = "Pages";

export default function MyBook() {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const bookRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    const updateDimensions = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);

      if (containerRef.current) {
        const container = containerRef.current;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        // Calculate dimensions based on container size and device
        const width = isMobileView
          ? containerWidth * 0.9
          : containerWidth * 0.45;
        const height = Math.min(containerHeight * 0.8, width * 1.4); // Maintain aspect ratio

        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handlePageFlip = (e) => {
    setCurrentPage(e.data);
  };

  return (
    <div
      ref={containerRef}
      className="flex justify-center overflow-hidden items-center h-full w-full bg-gray-100 p-4 md:p-8"
    >
      <div className="relative w-full h-full">
        <Document
          file="demo2.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex justify-center items-center h-96">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          }
        >
          {numPages && dimensions.width > 0 && (
            <HTMLFlipBook
              ref={bookRef}
              width={650}
              height={800}
              size="stretch"
              showCover={false}
              flippingTime={1000}
              className="shadow-2xl bg-red-500 w-full h-full"
              startPage={0}
              drawShadow={true}
              usePortrait={isMobile}
              startZIndex={1}
              autoSize={true}
              mobileScrollSupport={true}
              onFlip={handlePageFlip}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Pages key={index} pageNumber={index + 1} />
              ))}
            </HTMLFlipBook>
          )}
        </Document>

        {numPages && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/80 px-4 py-2 rounded-full shadow-md">
            <p className="text-gray-700">
              Page {currentPage + 1} of {numPages}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
