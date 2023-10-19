// import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index";
import { useState, useEffect } from "react";
import Axios from 'axios';
import { BASE_URL } from "./constants";

function App() {

  // const [user, setUser] = useState({
  //   userName:'',
  //   userEmail:'',
  //   userImg:''
  // });

  // useEffect(() => {
  //   //   withCredentials: true,
  //   // })
  //     .then((res) => {
  //       if (res.status == 200) {
  //         setUser({
  //           userName: res.data.user[0],
  //           userEmail: res.data.user[1],
  //           userImg: res.data.user[2]
  //         })
  //       } else {
  //         console.log("No status");
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  // const isLoggedIn = (user:{ userName:string }) => {
  //   return user.userName.length > 0;
  // }

  return (
    <div className="app">
      <Home/>
    </div>
  )
}

export default App
