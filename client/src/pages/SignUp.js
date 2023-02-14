import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios";

//style
import "../assets/css/main.css";

function Register() {

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    passwordConfirm: "", // 비밀번호 확인
    nickname: "", // 닉네임
    name: "", // 이름
    phoneNumber: "",  // 폰번호 
    walletAddress: "", // 지갑주소
    idNumber: "" // 주민등록번호
  })

  const handleInputValue=(key)=>(e)=>{
    setUserInfo({...userInfo, [key]:e.target.value})
}

function validateForm(){
  return userInfo.email>0 && userInfo.nickname>0 && userInfo.password.length>0 && 
  userInfo.password===userInfo.passwordConfirm && userInfo.idNumber>0 
  && userInfo.name>0 && userInfo.phoneNumber>0
}

function handleSubmit(event){
  let isSigninSuccess = false
  event.preventDefault();
  if( 
      userInfo.email &&
      userInfo.password &&
      userInfo.nickname && 
      userInfo.idNumber &&
      userInfo.phoneNumber &&
      userInfo.name &&
      userInfo.walletAddress
  ){
      axios.post("http://localhost:8080/user/signUp", userInfo)
      .then((result)=>{
        console.log(result)
        
        result.statusText==="OK"? isSigninSuccess=true : isSigninSuccess=false
    })
    .then(()=>{
        
        isSigninSuccess? navigate('/login') : alert("failed")
    }).catch((e)=>console.log(e))
}
}

  return (
    <div
      className="mt-36"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <form>
        <input
          type="text"
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
          value={userInfo.email}
          onChange={handleInputValue("email")}
          placeholder="이메일"
        />
        <br />
        <input
          type="password"
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
          value={userInfo.password}
          onChange={handleInputValue("password")}
          placeholder="비밀번호"
        />
        <br />
        <input
          type="password"
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
          value={userInfo.passwordConfirm}
          onChange={handleInputValue("passwordConfirm")}
          placeholder="비밀번호 확인"
        />
        <br />
        <input
          type="text"
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
          value={userInfo.nickname}
          onChange={handleInputValue("nickname")}
          placeholder="닉네임"
        />
        <br />
        <input
          type="text"
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
          value={userInfo.name}
          onChange={handleInputValue("name")}
          placeholder="실명"
        />
        <br />
        <input
          type="text"
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
          value={userInfo.phoneNumber}
          onChange={handleInputValue("phoneNumber")}
          placeholder="전화번호"
        />
        <br />
        <input
          type="text"
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
          value={userInfo.idNumber}
          onChange={handleInputValue("idNumber")}
          placeholder="주민등록번호 ( - 없이 입력해주세요)"
        />
        <br />
        <input
          type="text"
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
          value={userInfo.walletAddress}
          onChange={handleInputValue("walletAddress")}
          placeholder="MetaMask 지갑 주소"
        />
        <br />
        <button
          type="submit"
          onClick={handleSubmit}
          className="inline-block px-6 py-2 border-2 border-black text-black font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          disabled={!validateForm}
        >
          회원가입
        </button>
      </form>
    </div>
  );
}

export default Register;
