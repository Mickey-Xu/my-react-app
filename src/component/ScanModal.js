// QRScannerFullScreen.jsx
import React, { useRef, useEffect, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';
import {
    Button,
    Dialog,
    Slide,
    makeStyles,
    Typography,
    IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
const useStyles = makeStyles(theme => ({
    fullScreenDialog: {
        backgroundColor: 'black',
        padding: 0,
    },
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: 1,
    },
    scannerFrame: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 250,
        height: 250,
        transform: 'translate(-50%, -50%)',
        border: '2px solid #00ff00',
        boxSizing: 'border-box',
        zIndex: 2,
        overflow: 'hidden',
    },
    scanLine: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: 2,
        backgroundColor: '#00ff00',
        animation: '$scan 2s linear infinite',
        zIndex: 3,
    },
    '@keyframes scan': {
        '0%': { top: 0 },
        '100%': { top: '100%' },
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        color: 'white',
        zIndex: 4,
    },
    resultDisplay: {
        marginTop: 20,
        color: '#333',
    },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const QRScannerFullScreen = () => {
    const classes = useStyles();
    const videoRef = useRef(null);
    const codeReader = useRef(new BrowserMultiFormatReader());
    const [open, setOpen] = useState(false);
    const [result, setResult] = useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        codeReader.current.reset();
        setOpen(false);
    };
    useEffect(() => {
        if (open) {
            codeReader.current
                .listVideoInputDevices()
                .then(videoInputDevices => {
                    const firstDeviceId = videoInputDevices[0]?.deviceId;
                    if (!firstDeviceId) {
                        console.warn('未找到摄像头设备');
                        return;
                    }
                    codeReader.current.decodeFromVideoDevice(
                        firstDeviceId,
                        videoRef.current,
                        (result, err) => {
                            if (result) {
                                setResult(result.getText());
                                console.log('扫码结果:', result.getText());
                                handleClose();
                            }
                            if (err && !(err.name === 'NotFoundException')) {
                                console.error(err);
                            }
                        }
                    );
                })
                .catch(err => console.error('摄像头初始化失败:', err));
        }
        return () => {
            codeReader.current.reset();
        };
    }, [open]);
    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                扫一扫
            </Button>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                classes={{ paper: classes.fullScreenDialog }}
            >
                <video ref={videoRef} className={classes.video} muted autoPlay playsInline />
                {/* 扫码框 */}
                <div className={classes.scannerFrame}>
                    <div className={classes.scanLine}></div>
                </div>
                {/* 关闭按钮 */}
                <IconButton onClick={handleClose} className={classes.closeButton}>
                    <CloseIcon />
                </IconButton>
            </Dialog>
            {/* 扫描结果展示 */}
            {result && (
                <Typography variant="h6" className={classes.resultDisplay}>
                    扫描结果：{result}
                </Typography>
            )}
        </div>
    );
};
export default QRScannerFullScreen;