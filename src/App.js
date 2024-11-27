import logo from './logo.svg';
import './App.css';
import { Photo } from './component/photo';
import { Button } from '@material-ui/core';
import axios from "axios";

function App() {

   const getIDPToken = () => {
    const data = {
      "AppId": "SCF.IQAPP",
      "UserName": "IQAPP",
      "Password": "YtLPPMGa9YUkGsJZNYJA8"
    }

    return axios.post("/user/login", data, {
      headers: { "Content-Type": "application/json" }
    })
      .then(response => {
        window.localStorage.setItem("idptAuth", JSON.stringify(response.data?.data));
      })
      .catch(error => {
        console.error('Error:', error);
        return Promise.reject(error);
      });

  }

  return (
    <div>
      <Photo />
      <Button onClick={() => getIDPToken()}>登录</Button>
      <Button>加载</Button>

    </div>
  );
}

export default App;
