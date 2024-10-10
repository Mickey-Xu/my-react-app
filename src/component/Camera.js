import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import { IconButton, Button, Box } from '@material-ui/core';
import List from '@material-ui/core/List';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import React, { useRef, useState } from 'react';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'fixed',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [photo, setPhoto] = useState(null);


    const handleClickOpen = () => {
        setOpen(true);
        toggleCamera();
    };

    const handleClose = async () => {
        setOpen(false);
        setPhoto(null);
        const stream = videoRef.current.srcObject;
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
        setIsCameraOn(false);
    };

    const toggleCamera = async () => {
        if (isCameraOn) {
            // 停止相机
            const stream = videoRef.current.srcObject;
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
                videoRef.current.srcObject = null;
            }
            setIsCameraOn(false);
        } else {
            // 开启相机
            try {
                // const stream = await navigator.mediaDevices.getUserMedia({
                //     video: { facingMode: { exact: 'environment' } }
                // });
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true
                });
                videoRef.current.srcObject = stream;
                setIsCameraOn(true);
            } catch (error) {
                console.error("Error accessing the camera:", error);
            }
        }
    };

    const takePhoto = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;

        if (video && canvas) {
            const context = canvas.getContext('2d');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            // 获取图像的 base64 编码
            const base64Image = canvas.toDataURL('image/png');
            setPhoto(base64Image);
            console.log(base64Image); // 或者根据需要处理
            setIsCameraOn(false)
            toggleCamera()
        }
    };


    return (
        <div>
            <Typography onClick={handleClickOpen} color="secondary" variant="body2">
                拍照
            </Typography>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <List style={{ backgroundColor: "black", padding: 0, margin: 0, height: "100%" }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: "100%" }}>
                        <div style={{ width: '100%', height: '100%', position: 'relative', top: 0, left: 0 }}>
                            <video
                                ref={videoRef}
                                playsInline
                                autoPlay
                                style={{ display: isCameraOn ? 'block' : 'none', width: '100%', height: '100%', zIndex: 1 }}
                            />
                            <img src={photo} alt="" style={{
                                maxWidth: '100%', height: 'auto', display: photo ? 'block' : 'none', position: 'absolute',
                                top: "56px"
                            }} />
                            <canvas ref={canvasRef} style={{ display: 'none' }} />

                            {isCameraOn && props?.showCameraFrame && (
                                <div style={{
                                    position: "absolute",
                                    width: "30%",
                                    height: "4%",
                                    border: "1px dashed red",
                                    top: "40%",
                                    left: "5%",
                                    borderRadius: "10%",
                                    pointerEvents: 'none',
                                    zIndex: 100
                                }}></div>
                            )}
                            {isCameraOn && props?.showCameraFrame && (
                                <div style={{
                                    position: "absolute",
                                    width: "30%",
                                    height: "70%",
                                    border: "1px dashed red",
                                    top: "86px",
                                    right: "15%",
                                    borderRadius: "5%",
                                    pointerEvents: 'none',
                                    zIndex: '1000 !important'
                                }}></div>
                            )}
                            <Box style={{
                                position: "fixed",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                fontWeight: 600,
                                display: "flex",
                                justifyContent: "space-around",
                                zIndex: 100

                            }}>
                                <Button
                                    onClick={() => {
                                        toggleCamera();
                                        setIsCameraOn(true)
                                        setPhoto(null)
                                    }}
                                    disabled={isCameraOn}
                                    style={{
                                        color: 'white',
                                    }}>
                                    重拍
                                </Button>
                                <Box style={{
                                    border: " 5px solid white",
                                    borderRadius: "50%",
                                    padding: "2px"
                                }}>
                                    <Button
                                        onClick={() => takePhoto()}
                                        disabled={!isCameraOn}
                                        style={{
                                            color: 'black',
                                            width: "60px",
                                            height: "60px",
                                            backgroundColor: "white",
                                            borderRadius: " 50%",

                                        }}>
                                        拍照
                                    </Button>
                                </Box>

                                <Button
                                    onClick={() => {
                                        props.onChange(photo);
                                        setOpen(false);
                                        setPhoto(null);
                                    }}
                                    disabled={isCameraOn}
                                    style={{
                                        color: 'white',
                                    }}>
                                    使用照片
                                </Button>
                            </Box>

                        </div>
                    </div>

                </List>
            </Dialog>
        </div>
    );
}


