import React, { useState } from 'react';
import { Button, Typography } from '@material-ui/core';
// import QRCodeScanner from './QRCodeScanner';
import QRCodeScanner from '../src/component/ScanModal';
// import Model from "../src/component/Model/index"
import PDF from "../src/component/PDF"



function App() {
  const [open, setOpen] = useState(false);

 return (
   <div style={{ padding: 0 }}>
     {/* <Button style={{ padding: 0 }} onClick={() => setOpen(true)}>
       <span>扫码_version2</span>
     </Button>
     <Model open={open} handleClose={() => setOpen(false)}>
       <QRCodeScanner open={open} />
     </Model> */}

     <PDF />
</div>
 );
}
export default App;