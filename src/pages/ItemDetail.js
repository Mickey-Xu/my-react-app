// import React from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// const ItemDetail = ({ item }) => {
//     const { itemName } = useParams();  // 获取 URL 中的 itemName
//     const navigate = useNavigate();  // 用来进行页面跳转
//     console.log(itemName)
//     // 递归查找 item 数据
//     const findItem = (name, items) => {
//         for (let i = 0; i < items.length; i++) {
//             if (items[i].Name === name) {
//                 return items[i];
//             }
//             if (items[i].Children) {
//                 const found = findItem(name, items[i].Children);
//                 if (found) return found;
//             }
//         }
//         return null;
//     };

//     const currentItem = findItem(itemName, [item]);  // 获取当前选中的 item

//     // if (!currentItem) {
//     //     return <div>未找到该项</div>;
//     // }

//     return (
//         <div>
//             <h2>{currentItem.Name}</h2>
//             {currentItem.Children && currentItem.Children.length > 0 ? (
//                 <ul>
//                     {currentItem.Children.map((child, index) => (
//                         <li key={index}>
//                             {child.Type === 'folder' ? (
//                                 <Link to={`/item/${child.Name}`}>{child.Name}</Link>
//                             ) : (
//                                 <span>{child.Name}</span>
//                             )}
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>没有更多子项</p>
//             )}
//             <button onClick={() => navigate('/')}>返回1</button>
//         </div>
//     );
// };

// export default ItemDetail;


import React from 'react';

import { Link, useParams } from 'react-router-dom';
const data = {
    Name: "group_ims",
    Type: "folder",
    Children: [
        {
            Name: "ed",
            Type: "folder",
            Children: [
                {
                    Name: "EMBD Documents",
                    Type: "folder",
                    Children: [
                        {
                            Name: "01_MR_HR MECH",
                            Type: "folder",
                            Children: [
                                { Name: "CWT Rear MR + mach w dump 2STM PV50__K_43405190__EN__00.PDF", Type: "file" },
                                { Name: "CWT Side MR + mach w dump 2STM PV50__K_43405189__EN__00.PDF", Type: "file" },
                                // 这里可以添加更多的文件和文件夹
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};

const ItemListDetail = () => {
    const { itemName } = useParams(); // 获取当前路径中的参数

    // 递归查找 item 数据
  
    

    // 如果找到当前项目，显示详情
    return (
        <div>
            <Link to={`/itfList`}>itfList</Link>

        </div>
    );
};

export default ItemListDetail;
