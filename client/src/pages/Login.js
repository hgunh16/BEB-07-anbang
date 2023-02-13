import React, { useState,useContext } from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios"


function Login({setUserAuth}) {
  const navigate = useNavigate();
  const [account, setAccount] = useState({
    email:"",
    password:"",
  })

  const handleInputValue = (key) => (e) => {
    setAccount({...account, [key]: e.target.value})
}

function validateForm(){
  return account.email>0 && account.password>0
}

function handleSubmit(event){
  event.preventDefault();
  if(account.email && account.password){
      axios.post("http://localhost:8080/user/login", account)
      .then((result) => {
          console.log(result.data)
          if(result.data.status==="success") {
              setAccount({email: account.email, password: account.password, isConnected: "true"})}

              setUserAuth(result.data.data.accessToken, result.data.data.userData.id)
              console.log(result.data.data.accessToken, result.data.data.userData.id)

              localStorage.setItem("account", JSON.stringify(account)); // account state 저장
              navigate("/main", { state: { account } })
              console.log(account);

      })
      .then(() => {
          if(account.isConnected === "true"){
              console.log(account.isConnected)
          }})
      .catch((e)=>console.log(e))
      
  }
}

  return (
    <div
      className="mt-36"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
          value={account.email}
          onChange={handleInputValue("email")}
          placeholder="Email"
        />

        <br />
        <input
          type="password"
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
          value={account.password}
          onChange={handleInputValue("password")}
          placeholder="Password"
        />
        <br />
        <button
          onClick={handleSubmit}
          type="button"
          className="inline-block px-6 py-2 border-2 border-black text-black font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          disabled={!validateForm}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
