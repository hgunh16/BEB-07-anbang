// modules
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import NFTs from "../hooks/NFTs";
import Minting from "./Minting";
import Mypage from "./Mypage";
import Message from "./Message";
import Hero from "../components/Hero";
import ContractAgree from "./ContractAgree";

// stylesheet
import "../assets/css/main.css";

export default function Main() {

    // useEffect(()=>{
    //     if(localStorage.getItem('account') === null) {
    //         window.location.replace('http://localhost:3000/login')
    //     }
    //   }, []);

  return (
    <div className="mx-8 position: relative justify-center h-min">
      <div className="grid place-items-center">
        <div className="flex flex-row">
          <div className="mt-10">
            <div className="grid place-items-center">
              <div
                class="inline-flex shadow-md hover:shadow-lg focus:shadow-lg"
                role="group"
              >
                <Link to="/mypage" component={Mypage}>
                  <a>
                    <button
                      type="button"
                      className="rounded-l inline-block px-6 py-2.5 bg-stone-600/50 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
                    >
                      My page
                    </button>
                  </a>
                </Link>
                <Link to="/minting" component={Minting}>
                  <a>
                    <button
                      type="button"
                      className="rounded-r inline-block px-6 py-2.5 bg-stone-600/50 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
                    >
                      NFT 등록
                    </button>
                  </a>
                </Link>
                {/* <Link to="/message" component={Message}>
                  <a>
                    <button
                      type="button"
                      className="rounded-r inline-block px-6 py-2.5 bg-stone-600/50 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
                    >
                      메세지
                    </button>
                  </a>
                </Link> */}
              </div>
            </div>
          </div>
        </div>
        <Hero />
        <NFTs />
      </div>
    </div>
  );
}
