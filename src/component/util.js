
const getCurrentPosition = () => {
    return new Promise((resolve) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    resolve({ status: 'success', data: { latitude, longitude } });
                },
                (error) => {
                    resolve({ status: 'error', message: error.message });
                }
            );
        } else {
            resolve({ status: 'error', message: 'Geolocation is not supported by this browser.' });
        }
    });

};

// 根据经纬度获取详细地址
const getLocationFromCoordinates = (latitude, longitude) => {
    return new Promise((resolve, reject) => {
        if (window.BMap) {
            const geocoder = new window.BMap.Geocoder(); // 创建 Geocoder 实例
            const point = new window.BMap.Point(longitude, latitude); // 创建坐标对象

            geocoder.getLocation(point, (result) => {
                if (result) {
                    resolve(result.address);
                } else {
                    resolve('无法获取地址信息');
                }
            });
        } else {
            reject('百度地图 API 未加载');
        }
    });
};

export const fillTextToImg = async (base64, projectParams, isOnline) => {
    // let data = store.getState();
    // let location = { longitude: "121.197237", latitude: "31.449172" }
    // const location = await getCurrentPosition();
    // let address = await getLocationFromCoordinates(location?.data?.latitude, location?.data?.longitude);
    // let projectName = data.projects[projectParams.projectNumber]?.description;
    // let time = getTime();
    
    var address = ""
    if (isOnline) {
        // const location = await getCurrentPosition();
        address = await getLocationFromCoordinates(121.499768, 31.239774);
    }

    let watermarkText = [`拍摄地点：${address}`, `拍摄时间：2025-08-02 18：12 57`, `订单编号：0000000000`, `项目名称：神塔啊啊啊`];

    const img = new Image();
    img.src = base64;
    img.setAttribute("crossOrigin", "Anonymous");

    return new Promise((resolve) => {

        img.onload = () => {

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = img.width;
            canvas.height = img.height;

            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            ctx.font = '15px Arial';
            ctx.textAlign = "left";
            ctx.fillStyle = "#ffffff";

            let lineHeight = 0;

            watermarkText.forEach(item => {
                lineHeight += 30
                ctx.fillText(item, 20, canvas.height - lineHeight + 20);
            })

            resolve(canvas.toDataURL("image/jpg"));
        };
    });
}

export const getCameraTipInfo = (photoType) => {
    const photoJP = ["挂钩位置", "拉力计/测试片", "信息牌", "拉力计显示", "底座"];
    const data = {
        "photo_DZDY": ["1.防扭转钢丝绳", "2.合同号", "3.第一根电梯钢丝绳"],
        "photo_JXDY": ["1.防扭转钢丝绳", "2.称重装置", "3.合同号", "4.第一根电梯钢丝绳"],
        "photo_DZWC": ["1.合同号", "2.对重侧防扭转钢丝绳安装完成"],
        "photo_JXWC": ["1.称重装置", "2.合同号", "3.防扭转钢丝绳安装完成"],
        "photo_DXZZ": ["1.导向绳", "2.电梯主钢丝绳"],
        "photo_SCZZ": ["1.钢制刹车装置", "2.木制刹车装置", "3.一根钢丝绳"],
        "photoJ": photoJP,
        "photoP": photoJP,
    };

    return data[photoType] || [];
}