"use client";

import { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
  fileUrl: string;
}

export default function PDFViewer({ fileUrl }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const [containerWidth, setContainerWidth] = useState<number>(800);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const changePage = (offset: number) => {
    setPageNumber((prevPageNumber) => 
      Math.min(Math.max(1, prevPageNumber + offset), numPages)
    );
  };

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.2, 2.5));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5));

  // Magnetic Button component for the premium feel
  const MagneticButton = ({ onClick, disabled, children, ariaLabel }: any) => {
    return (
      <motion.button
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel}
        whileHover={{ scale: disabled ? 1 : 1.05 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
          disabled 
            ? "opacity-30 cursor-not-allowed bg-transparent text-brand-navy/30" 
            : "bg-black/[0.03] hover:bg-black/[0.08] text-brand-navy/80 hover:text-brand-navy border border-black/5 hover:border-black/10 shadow-sm"
        }`}
      >
        {children}
      </motion.button>
    );
  };

  return (
    <div className="flex flex-col items-center w-full mx-auto z-10 relative pb-10">
      
      {/* Main Document Viewer Container */}
      <div 
        ref={containerRef}
        className="w-full relative overflow-hidden flex items-center justify-center min-h-[80vh] px-2 md:px-0 mb-8"
      >
        <Document
          file={fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex flex-col items-center justify-center space-y-4 py-20">
              <div className="w-8 h-8 border-2 border-brand-navy/20 border-t-brand-navy rounded-full animate-spin"></div>
              <p className="text-brand-navy/50 font-mono text-sm tracking-widest uppercase">Initializing</p>
            </div>
          }
          className="max-w-full flex flex-col items-center justify-center relative w-full"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={pageNumber}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.02, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center w-full"
            >
              <Page 
                pageNumber={pageNumber} 
                width={containerWidth ? Math.min(containerWidth, 1600) * scale : undefined}
                className="shadow-2xl overflow-hidden"
                renderTextLayer={true}
                renderAnnotationLayer={true}
              />
            </motion.div>
          </AnimatePresence>
        </Document>
      </div>

      {/* Premium Controls Toolbar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex items-center justify-between w-full max-w-4xl mx-auto px-6 py-3 rounded-[2.5rem] bg-gradient-to-b from-white/90 to-[#f0f4f8]/80 backdrop-blur-[32px] border border-white/80 shadow-[0_12px_40px_-8px_rgba(11,30,54,0.15),inset_0_2px_4px_rgba(255,255,255,1)] z-20 relative"
      >
        <div className="flex items-center gap-2">
          <MagneticButton onClick={handleZoomOut} ariaLabel="Zoom Out">
            <ZoomOut size={18} />
          </MagneticButton>
          <span className="text-brand-navy/80 text-xs font-mono w-12 text-center tracking-wider font-semibold">
            {Math.round(scale * 100)}%
          </span>
          <MagneticButton onClick={handleZoomIn} ariaLabel="Zoom In">
            <ZoomIn size={18} />
          </MagneticButton>
        </div>

        <div className="flex items-center gap-4">
          <MagneticButton 
            onClick={() => changePage(-1)} 
            disabled={pageNumber <= 1}
            ariaLabel="Previous Page"
          >
            <ChevronLeft size={20} />
          </MagneticButton>
          
          <div className="flex items-center justify-center min-w-[80px]">
            <span className="text-brand-navy font-mono text-sm tracking-widest font-semibold">
              {pageNumber} <span className="text-brand-navy/30">/</span> {numPages || '-'}
            </span>
          </div>

          <MagneticButton 
            onClick={() => changePage(1)} 
            disabled={pageNumber >= numPages}
            ariaLabel="Next Page"
          >
            <ChevronRight size={20} />
          </MagneticButton>
        </div>

        <div className="flex items-center">
          <a href={fileUrl} download target="_blank" rel="noopener noreferrer">
            <MagneticButton ariaLabel="Download PDF">
              <Download size={18} />
            </MagneticButton>
          </a>
        </div>
      </motion.div>

    </div>
  );
}
