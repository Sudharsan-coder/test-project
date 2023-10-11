import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useState, useEffect } from "react";
import Axios from 'axios';
import { BASE_URL } from "./constants";
import * as AuthAPI from './api/AuthAPI';

function App() {

  const [user, setUser] = useState({
    userName:'',
    userEmail:'',
    userImg:''
  });

  useEffect(() => {
    // Axios.get(`${BASE_URL}/auth/login/success`, {
    //   withCredentials: true,
    // })
    AuthAPI.success()
      .then((res) => {
        if (res.status == 200) {
          setUser({
            userName: res.data.user[0],
            userEmail: res.data.user[1],
            userImg: res.data.user[2]
          })
        } else {
          console.log("No status");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const isLoggedIn = (user:{ userName:string }) => {
    return user.userName.length > 0;
  }

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home user={user}/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
