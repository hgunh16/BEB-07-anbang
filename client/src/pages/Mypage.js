// modules
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ReactDOM from 'react-dom'
import axios from 'axios'
import { BrowserRouter, Route, Routes, Switch} from 'react-router-dom';
import MyNFT from "../hooks/MyNFT";

// stylesheet
import "../assets/css/main.css";

export default function Mypage() {

    const [MyNFTInfo, setMyNFTInfo] = useState([])

      useEffect(()=>{
        if(localStorage.getItem('account') === null) {
            window.location.replace('http://localhost:3000/login')
        }
      }, []);
    

    return(

        <div>
            {MyNFTInfo.map((post) => (
                <div className="flex flex-col items-center">
                    <div className="flex flex-row mt-20">
                        <div className="flex items-center font-bold mr-5">보유 NFT 리스트</div>
                        <MyNFT />
                    </div>
                    
                    <div className="flex flex-row mt-20">
                        <div className="flex items-center font-bold mr-5">진행중인 계약</div>
                            <p value={post}>진행중인 계약 1 </p>
                            {/* 진행중인 계약 어떤 방식으로 넘어오는지 */}
                    </div>
                </div>        
            ))}

        </div>




    )
}