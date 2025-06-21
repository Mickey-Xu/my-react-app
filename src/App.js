import React,{ useState, useEffect } from 'react';
import Pdf from './component/PDF';
import ScanModal from './component/ScanModal';
import testData from "../src/component/moke_test.json"
import Photo from './component/Photo';
// import Test from './component/Test';



const Index = () => {
  // const [data, setData] = useState("");
  // useEffect(() => {
  //   setData(base64PDF);
  // }, [])
  console.log(testData)
  return <div>
     {/* version:8 */}
     {/* <h2>version:1</h2>version: */}
     <>
       {/* <embed width="100%" height={window.innerHeight} src={data} /> */}
       {/* <Photo /> */}
      {/* <Test /> */}
      <ScanModal />
      {/* <Photo />  */}
      {/* <Pdf /> */}
     </></div>
}

export default Index;




// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import ItemList from '../src/pages/ItemList';
// import ItemListDetail from '../src/pages/ItemDetail';



// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/itfList" element={<ItemListDetail  />} />
//         <Route path="/itfListDetail/:itemName" element={<ItemListDetail />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
