import "./App.css";
import React, { useContext, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Preview from "./pages/preview";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Main from "./pages/Main";
import Token from "./pages/Token";
import NFTdetail from "./pages/NFTdetail";
import Mypage from "./pages/Mypage";
import Message from "./pages/Message";
import Minting from "./pages/Minting";
import Contract from "./pages/Contract";
import ContractAgree from "./pages/ContractAgree";
import Report from "./hooks/Report";

import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";


function App() {
  const [isLogin, setIsLogin] = useState(false);
  const navigation = useNavigate();
  
  

  const [authorization, setAuthorization] = useState(""); //authrization 에 accessToken들어오게끔
  const [userId, setUserId] = useState(""); // userId 값
  const setUserAuth = (token, id) => {
    setAuthorization(token);
    setUserId(id);
  }



  const loginHandler = async () => {
    const dataToLogin = await axios.get("http://localhost:8080/user/login")
    .then(result=>result.data)
    .catch(err=>err)

    const loginResult = await axios.post("http://localhost:8080/user/login", {dataToLogin}, {withCredentials: true})
    .then(result=>{
      return result.data;
    })
    .catch(console.log)

    if(!loginResult) return;
    setIsLogin(true);
  }


  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Preview />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login setUserAuth={setUserAuth} />} />
        {/* { isLogin ? <Route path="/main" element={<Main isLogin={isLogin}/>} /> : <Route path="/login"/>} 로그인 되었을 때만 메인보이게 */}
        <Route path="/main" element={<Main />} />
        <Route path="/token" element={<Token />} />
        <Route path="/NFTdetail" element={<NFTdetail />} />
        <Route path="/mypage" element={<Mypage userId={userId} authorization={authorization} />} />
        <Route path="/message" element={<Message />} />
        <Route path="/minting" element={<Minting userId={userId} authorization={authorization}/>} />
        <Route path="/contract" element={<Contract />} />
        <Route path="/contractagree" element={<ContractAgree />} />
        <Route path="/report" element={<Report />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
