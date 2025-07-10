import React, { useEffect, useRef } from 'react';
import { Viewer, Worker, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Box, Button } from '@material-ui/core';
// import { getTime } from 'js/util';
// import { useHistory } from "react-router-dom";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import closeIcon from "../img/close.png"
import {data} from './pdfmoke.js';

// import testPdf from "./test.pdf"
import "./PDF.css";

const workerSrc = `https://unpkg.com/pdfjs-dist@2/build/pdf.worker.min.js`;

const Watermark = () => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const watermarkText = `${`xumick`} ${'Confidential'}`
  const watermarkContent = [
    watermarkText, watermarkText, watermarkText
  ];
  return (
    <div>
      {watermarkContent.map((item, index) => {
        return <div className='watermark' style={{ top: (index + 1) * 23 + '%' }} key={index}>
          <div>
            {item}
          </div>
          <div className='watermark-text'>
          2020-02-03
          </div>
        </div>
      })}
    </div>

  );
};

const PdfViewer = ({  }) => {
  const containerRef = useRef(null);
  // const history = useHistory();
  const defaultLayoutPluginInstance = defaultLayoutPlugin(
    {
      sidebarTabs: (defaultTabs) => {
        return [defaultTabs.find(item => item.title === "Thumbnail")];
      }
    }
  );
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
        const url = href.split("query=")[1];
        // history.push(`/itf_retrievalPage/${url}`)

      }
    };
    container.addEventListener('click', handleClick);
    return () => container.removeEventListener('click', handleClick);
  }, []);

  document.addEventListener('touchstart', function (e) {
    if (e.touches.length > 1) {
      e.preventDefault(); // 禁用多点触控缩放   
    }
  }, { passive: false });
  document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
  });

  return (
    <Box>
      <Button style={{ position: "fixed", top: 0, zIndex: 10, right: 0, color: "white" }}>
        <img src={closeIcon} />
      </Button>
      <div ref={containerRef} style={{ height: "100vh" }}>
        <Worker workerUrl={workerSrc}>
          <Viewer
            fileUrl={data}
            plugins={[defaultLayoutPluginInstance]}
            defaultScale={SpecialZoomLevel.PageFit}
          />
          <Watermark />
        </Worker>
      </div>
    </Box>

  );
};
export default PdfViewer;