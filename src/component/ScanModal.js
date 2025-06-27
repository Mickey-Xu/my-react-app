import React, { useEffect, useRef } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library'; // Import ZXing components
import { Box } from "@material-ui/core";
// import { useHistory } from "react-router-dom";
import "./scan.css";

const QrScanner = ({ open }) => {
    // const history = useHistory();
    const videoRef = useRef(null);

    useEffect(() => {
        const codeReader = new BrowserMultiFormatReader();
        const videoElement = videoRef.current;

        const startScanning = () => {
            codeReader
                .decodeFromVideoDevice(null, videoElement, (result, err) => {
                    if (result) {
                        const url = result.text.split("query=")[1];
                        // history.push(`/itf_retrievalPage/${url}`);
                        console.log(url)
                        console.log(result.getText())


                        codeReader.reset();
                    } else if (err && !(err instanceof NotFoundException)) {
                        console.error(err);
                    }
                })
                .catch((err) => {
                    console.error('Error:', err);
                });
        };

        if (!open) {
            return () => {
                codeReader.reset();
            };
        };

        startScanning();

        return () => {
            codeReader.reset();
        };
    }, [open]);

    const frameStyle = {
        position: 'absolute',
        top: '25%',
        left: '15%',
        width: '70%',
        height: '50%',
        border: '2px solid rgb(220, 2, 2)',
        boxSizing: 'border-box',
        zIndex: 3,
    };

    return (
        <Box className="video-container">
            <video ref={videoRef}
                playsInline
                autoPlay
                width="100%"
                height="auto"
            ></video>
            <div className="overlay">
                {/* 遮罩层 */}
                <div className="mask  topMask" />
                <div className="mask bttomMask" />
                <div className="mask leftMask" />
                <div className="mask rightMask" />
                {/* 扫描框 */}
                <div style={frameStyle}>
                    <div className="scanLine"></div>
                </div>
            </div>
        </Box>
    );
};

export default QrScanner;