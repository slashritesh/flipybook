"use client";
import React, { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Pages = React.forwardRef(({ pageNumber, pageSize }, ref) => {
  return (
    <div ref={ref} className="relative flex items-center bg-white shadow-md">
      <Page pageNumber={pageNumber} width={pageSize.width} />
    </div>
  );
});

Pages.displayName = "Pages";

export default function MyBook({ fileUrl }) {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [pageSize, setPageSize] = useState({ width: 400, height: 518 }); // Default size
  const bookRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 668);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function onDocumentLoadSuccess({ numPages, getPage }) {
    setNumPages(numPages);

    // Get the first page's size dynamically
    getPage(1).then((page) => {
      const viewport = page.getViewport({ scale: 1 });
      setPageSize({ width: viewport.width, height: viewport.height });
    });
  }

  const handlePageFlip = (e) => {
    setCurrentPage(e.data);
  };

  return (
    <div className="flex justify-center items-center h-screen my-20 p-2 sm:p-4 overflow-hidden">
      <div className="relative border h-fit flex justify-center">
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
              width={pageSize.width}
              height={pageSize.height}
              size="stretch"
              minWidth={pageSize.width * 0.8}
              maxWidth={pageSize.width * 1.2}
              minHeight={pageSize.height * 0.8}
              maxHeight={pageSize.height * 1.2}
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
              {Array.from(new Array(numPages), (_, index) => (
                <Pages key={index} pageNumber={index + 1} pageSize={pageSize} />
              ))}
            </HTMLFlipBook>
          )}
        </Document>
      </div>
    </div>
  );
}
