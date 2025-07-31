
    import React, { useState, useRef, useEffect } from 'react';
import { Viewer, Worker, ScrollMode, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import testPdf from "./test.pdf";
import { useSwipeable } from 'react-swipeable';

const workerSrc = `https://unpkg.com/pdfjs-dist@2/build/pdf.worker.min.js`;

const PdfViewerWithPagination = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [canSwipe, setCanSwipe] = useState(true);
  const viewerContainerRef = useRef(null);
  const pagesContainerRef = useRef(null);
  const viewerRef = useRef({
    jumpToPage: () => Promise.resolve(),
    getPagesContainer: () => null,
    zoom: null
  });

  // 分页控制插件
  const paginationPlugin = {
    install: (pluginFunctions) => {
      viewerRef.current = {
        jumpToPage: pluginFunctions.jumpToPage,
        getPagesContainer: pluginFunctions.getPagesContainer,
        zoom: pluginFunctions.zoom
      };
    }
  };

  // 默认布局插件
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    toolbarPlugin: {
      onZoom: (zoom) => {
        setIsZoomed(typeof zoom === 'number' ? zoom > 1 : false);
      }
    },
    // sidebarTabs: (defaultTabs) => [defaultTabs[0]] // 只保留缩略图
  });

  useEffect(() => {
    const handleScroll = () => {
      if (!pagesContainerRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = pagesContainerRef.current;
      setCanSwipe((scrollTop + clientHeight >= scrollHeight - 10) || !isZoomed);
    };

    const updatePagesContainer = () => {
      if (viewerRef.current.getPagesContainer) {
        const container = viewerRef.current.getPagesContainer();
        if (container) {
          pagesContainerRef.current = container;
          container.addEventListener('scroll', handleScroll);
        }
      }
    };

    updatePagesContainer();
    const intervalId = setInterval(updatePagesContainer, 500);

    return () => {
      clearInterval(intervalId);
      pagesContainerRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, [isZoomed]);

  const handleDocumentLoad = (e) => {
    setTotalPages(e.doc.numPages);
  };

  const jumpToPage = (pageIndex) => {
    if (pageIndex >= 0 && pageIndex < totalPages) {
      // 重置缩放并跳转页面
      viewerRef.current.zoom?.(SpecialZoomLevel.PageFit);
      setIsZoomed(false);
      viewerRef.current.jumpToPage(pageIndex)
        .then(() => setCurrentPage(pageIndex))
        .catch(console.error);
    }
  };

  const goToPreviousPage = () => jumpToPage(currentPage - 1);
  const goToNextPage = () => jumpToPage(currentPage + 1);

  // 手势配置
  const handlers = useSwipeable({
    onSwipedUp: ({ velocity }) => {
      if (velocity > 2 && canSwipe) goToNextPage();
    },
    onSwipedDown: ({ velocity }) => {
      if (velocity > 2 && canSwipe) goToPreviousPage();
    },
    trackMouse: true,
    delta: 200,
    preventDefaultTouchmoveEvent: true
  });

  return (
    <div {...handlers} style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f5f5f5',
      touchAction: isZoomed ? 'pan-y' : 'none'
    }}>
      <Worker workerUrl={workerSrc}>
        <div ref={viewerContainerRef} style={{ flex: 1, overflow: 'hidden' }}>
          <Viewer
            fileUrl={testPdf}
            plugins={[paginationPlugin, defaultLayoutPluginInstance]}
            scrollMode={ScrollMode.Page}
            onDocumentLoad={handleDocumentLoad}
            onPageChange={(e) => setCurrentPage(e.currentPage)}
          />
        </div>
      </Worker>
    </div>
  );
};

export default PdfViewerWithPagination;