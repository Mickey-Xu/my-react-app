import React, { useState, useEffect } from 'react';

function getDeviceType() {
    const userAgent = navigator.userAgent;

    if (/android/i.test(userAgent)) {
        return 'Android';
    } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
        return 'iOS';
    } else {
        return 'Unknown';
    }
}

const convertBase64ToBlob = (base64Data) => {
    const pdfData = base64Data.split(',')[1];
    if (!pdfData || pdfData === 'undefined' || pdfData === 'null' || pdfData === "") {
        alert("无效的PDF数据");
        return false;
    };

    const binaryData = atob(pdfData); // Decode Base64 to binary
    const uint8Array = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
    };
    return new Blob([uint8Array], { type: 'application/pdf' });
};

export const previewPDF = (base64PDF) => {
    const pdfBlob = convertBase64ToBlob(base64PDF);
 
    const pdfUrl = URL.createObjectURL(pdfBlob);
    console.log(getDeviceType());
    if (getDeviceType() === 'iOS') {
        window.location.href = pdfUrl;
    } else {
        const newWindow = window.open(pdfUrl, '_blank');
        if (newWindow) {
            newWindow.focus();
        } else {
            alert('请允许弹出窗口以查看PDF文件。');
        }

        // const url = window.URL.createObjectURL(pdfBlob);
        // const a = document.createElement('a');
        // a.style.display = 'none';
        // a.href = url;
        // a.download = 'filename.pdf'; // 设置下载文件名 document.body.appendChild(a);
        // a.click();
        // window.URL.revokeObjectURL(url);
    }

};

const App = ({ filePath }) => {
    // The Base64 encoded PDF string
    const base64PDF =
        filePath;

    return (
        <div className="App">
            <h1>Base64 PDF Viewer</h1>
            <button onClick={()=>previewPDF(base64PDF)}>Open PDF</button>
        </div>
    );
};

export default App;