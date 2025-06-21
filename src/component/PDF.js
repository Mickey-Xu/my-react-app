import { SpecialZoomLevel, Viewer, Worker, ScrollMode, ViewMode } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import { useEffect, useRef } from 'react';
import "./PDF.css";
import testPdf from './test.pdf';

const Watermark = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '50px',
        color: 'rgba(0, 0, 0, 0.2)',
        fontWeight: 'bold',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      CONFIDENTIAL
    </div>
  );
};

const PdfViewer = ({ fileUrl }) => {
  const containerRef = useRef(null);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  useEffect(() => {
    const container = containerRef.current;
    const handleClick = (e) => {
      const aTag = e.target.closest('a');
      if (!aTag || !container.contains(aTag)) return;
      e.preventDefault();
      const href = aTag.getAttribute('href');
      const label = aTag.textContent?.trim() || '[无文本]';
      // 📝 打印日志
      console.log(`点击链接: 文本 "${label}" → 目标 ${href}`);
      if (href.startsWith('#page=')) {
        const pageNum = parseInt(href.split('=')[1], 10);
        if (!isNaN(pageNum)) {
          // 🧭 触发 PDF 内部跳转（导航页码）
          const viewerElem = container.querySelector('[data-testid="viewer"]');
          if (viewerElem) {
            const goToPageEvent = new CustomEvent('page-jump', {
              detail: { pageIndex: pageNum - 1 },
            });
            viewerElem.dispatchEvent(goToPageEvent);
          }
        }
      } else {
        // 外部链接，新窗口打开
        // window.open(href, '_blank');
        console.log(href)
      }
    };
    container.addEventListener('click', handleClick);
    return () => container.removeEventListener('click', handleClick);
  }, []);


  const handleDocumentLoad = (e) => {
    console.log(`Number of pages:`, e);
  };
  
  
  return (
    
    <div ref={containerRef} style={{ height: '100vh' }}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2/build/pdf.worker.min.js">
        <Watermark />
        <Viewer
          // initialPage={4}
          fileUrl={testPdf}
          plugins={[defaultLayoutPluginInstance]}
          defaultScale={SpecialZoomLevel.PageFit}
          onDocumentLoad={handleDocumentLoad}
        />
      </Worker>
    </div>
  );
};
export default PdfViewer;