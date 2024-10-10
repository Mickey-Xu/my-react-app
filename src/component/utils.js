

export const fillTextToImg = async (base64, projectParams) => {
    // let data = store.getState();
    // let location = { longitude: "121.197237", latitude: "31.449172" }
    // const location = await getCurrentPosition();
    // let address = await getLocationFromCoordinates(location?.data?.latitude, location?.data?.longitude);
    // let projectName = data.projects[projectParams.projectNumber]?.description;
    // let time = getTime();

    let watermarkText = [`拍摄地点：江苏省 苏州市 昆山市 花桥镇`, `拍摄时间：2025-08-02 18：12 57`, `订单编号：0000000000`, `项目名称：神塔啊啊啊`];

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
