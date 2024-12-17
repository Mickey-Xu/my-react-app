import './App.css';
import { Photo } from './component/photo';

function App() {

  
  return (
    <div>
      <Photo />
      <div style={{
            position: 'fixed',
            bottom: '10%',
            left: '50%',
            backgroundColor: '#4bff00',
            color: 'white',
            fontWeight: 500,
            padding: '30px',
            marginLeft: '-24%',
            fontSize: '30px',
      }}>
        version: 3
      </div>
    </div>
  );
}

export default App;
