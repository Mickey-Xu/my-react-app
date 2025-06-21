import { Box, Button, FormLabel, makeStyles, Typography } from "@material-ui/core";
import { fillTextToImg } from "./utils";
import React, { useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import Camera from "./Camera"
import useNetworkStatus from "./NetworkStatus";
import axios from "axios";

const useStyles = makeStyles(({ spacing }) => ({
    btm: {
        display: "flex",
        justifyContent: "space-between",
        margin: spacing(1, 1, 0, 1),
    },
    root: {
        display: "grid",
        padding: spacing(1, 0),
        borderBottom: " 1px solid #e0e0e0",
        backgroundColor: "#FFF",
    },
    lable: {
        margin: spacing(0, 0, 1, 0),
        color: "rgba(0, 0, 0, 0.87)",
    },
    inputFile: {
        width: "0.1px",
        height: "0.1px",
        opacity: 0,
        overflow: "hidden",
        position: "absolute",
        top: "0",
        zIndex: -1,
    },
    file: {
        height: "160px",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
    },
}));

 const Photo = (props) => {
    const classes = useStyles();
    const [imgData, setImgData] = useState(null);
    const photoEl = useRef(null);
    const iptRef = useRef(null);
    const projectData = useParams();
     const isOnline = useNetworkStatus(); // 在函数组件中使用 Hook
     
     const [photoType, setPhotoType] = useState(null);


    const onPhotoChange = (e) => {
        // const src = document.getElementById("map").src;
        // axios.get(src).then((res) => {
        //   console.log(res)
        // }).catch((error) => {
        //     console.log(error)

    //   })

        fillTextToImg(e, projectData, false).then((res) => {
                    setImgData(res);
                })
            
    };
     return (
        
       
         <div className={classes.root}>
             
             <Box>
                 {[
                     "photo_DZDY",
                     "photo_JXDY",
                     "photo_DZWC",
                        "photo_JXWC",
                     "photo_DXZZ",
                     "photo_SCZZ", "photoJ","photoP"].map((item, index) => <Button onClick={() => setPhotoType(item)} key={index} style={{margin:5}} variant="contained" color={item===photoType? "primary":"default"}>
                        {item}
                     </Button>)}

             </Box>
            <Typography variant="subtitle2" className={classes.lable}>
                {props.label}
            </Typography>
            <div>
                <input
                    className={classes.inputFile}
                    type="file"
                    accept="image/x-png,image/jpeg,image/gif"
                    // accept="image/*"
                    // capture="user"
                    id={props.id}
                    ref={iptRef}
                    onChange={onPhotoChange}
                />
            </div>
            <div>
                {/* <Typography variant="body2">{props.description}</Typography> */}
                <FormLabel required={props.required}>
                    <Typography
                        component="span"
                        variant="subtitle2"
                        className={classes.lable}
                    >
                        {props.description}
                    </Typography>
                </FormLabel>
            </div>
            <Box border={1} className={classes.file}>
                <img src={imgData} style={{
                    width: "auto",
                    height: "100%",
}} ref={photoEl} alt="" />
            </Box>
            <Box className={classes.btm}>
                <Typography
                    color="secondary"
                    variant="body2"
                    onClick={() => {
                        setImgData("#");
                        iptRef.current.value = "";
                    }}
                >
                    删除图片
                </Typography>
           
                 <Camera onChange={(photo) => onPhotoChange(photo, 'camera')}
                     identifier={photoType}
                    />
                
            </Box>
        </div>
    );
};
export default Photo;