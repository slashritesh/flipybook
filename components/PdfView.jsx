'use client'
import React, { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PAGE_WIDTH = 400; // Ensure this matches FlipBook width
const PAGE_HEIGHT = 550; // Adjust for proper aspect ratio

const Pages = React.forwardRef(({ pageNumber }, ref) => {
  return (
    <div ref={ref} className="relative border flex items-center bg-white shadow-md ">
      <Page pageNumber={pageNumber} width={PAGE_WIDTH} />
    </div>
  );
});

Pages.displayName = "Pages";

export default function MyBook({fileUrl}) {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const bookRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      console.log(isMobile);

      setIsMobile(window.innerWidth < 668);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handlePageFlip = (e) => {
    setCurrentPage(e.data);
  };

  return (
      <div className="overflow-hidden border">
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
              width={PAGE_WIDTH} // Two pages in a row
              height={PAGE_HEIGHT}
              size="fixed"
              minWidth={400}
              maxWidth={PAGE_WIDTH}
              minHeight={500}
              maxHeight={PAGE_HEIGHT}
              showCover={false}
              flippingTime={1000}
              className="shadow-2xl bg-red-200"
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

        {/* {numPages && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white/80 px-3 py-1 rounded-full shadow-md text-sm">
            <p className="text-gray-700">
              Page {currentPage + 1} of {numPages}
            </p>
          </div>
        )} */}
      </div>
    
  );
}
