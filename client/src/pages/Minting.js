// modules
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import { Buffer } from "buffer";

import axios from "axios";
import { create } from "ipfs-http-client";

import Postcode from "../components/Postcode";
import web3 from "web3";
import {erc721_ABI, NFT_contractAddress} from '../contract/NFT_ABI';

// stylesheet
import "../assets/css/main.css";
import {ethers} from "ethers"

const projectId = '2LPkziQCCo7eL21iSYVGrg5Dqtu';   // <---------- your Infura Project ID
const projectSecret = '3e422f75dcf17f979f829ea39b13d5bc';  // <---------- your Infura Secret
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

export default function Register({userId, authorization}) {

    // useEffect(()=>{
    //     if(localStorage.getItem('account') === null) {
    //         window.location.replace('http://localhost:3000/login')
    //     }
    //   }, []);

  // minting NFT
  const [mintNFT, setMintNFT] = useState({
    nft_address: "", // 건물주소
    nft_imgURL: "", // 이미지 url
    types: "", // 건물종류
    gov_info: "", // 등기부등본
    deposit: "", // 보증금
    rental: "", // 월세
    description: "",// 부가설명
    tokenid: ""
  });
  const [imgFile, setImgFile] = React.useState(null);

  const client = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: 'https',
    apiPath: "/api/v0",
    headers: {
    authorization: auth,
    },
  });

  
  const ethereum = window.ethereum;
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const makingContract = new ethers.Contract(NFT_contractAddress, erc721_ABI, provider);

  // ipfs 메타데이터 생성 함수들
  const submitImage = async () => {
    if (!imgFile) return false;
  
    const data = {
      imgFile,
      nft_address: mintNFT.nft_address,
      types: mintNFT.types
    };
  
    const dataString = JSON.stringify(data);
  
    try {

      let added = await client.add(Buffer.from(dataString), {
        progress: (prog) => {
          if (prog < 1) {
            console.log(`received: ${prog}`);
          }
        }
      });

      const url = `http://making.infura-ipfs.io/ipfs/${added.path}`;
      console.log(url);
      setMintNFT({
        ...mintNFT,
        nft_address: mintNFT.nft_address,
        nft_imgURL: url,
        description: mintNFT.description,
        types: mintNFT.types
      });
      console.log(mintNFT)
      mintNFT.nft_imgURL = url;
      return url;
    } catch (e) {
      console.log(e);
    }
  };


  const handleImgChange = (e)=>{
    const curImgFile = e.target.files[0];
    // console.log(curImgFile);
    const reader = new FileReader();
    reader.readAsDataURL(curImgFile);
    reader.onload = function() {
        setImgFile(reader.result);
    }
  }

  const handleClickCreate = async () => {
    if (
      mintNFT.nft_address == "" ||
      mintNFT.types == "" ||
      imgFile == null
    ) {
      console.log("빈 칸이 있으면 안됩니다");
      alert("빈 칸이 있으면 안됩니다")
      return false;
    }
    await submitImage();
  };

  const handleInputValue = (key) => (e) => {
    setMintNFT({ ...mintNFT, [key]: e.target.value });
    // console.log(mintNFT);
  };
  

  // 이미지 미리보기
  const [imgChange, setimgChange] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImgPreview = (event) => {
    setimgChange(event.target.files[0]);
    console.log(imgChange);
    setPreview(URL.createObjectURL(event.target.files[0]));
  };

  // 등기부등본 조회
  function doublecheck(event) {
    let isCheckSuccess = false;
    event.preventDefault();
    handleClickCreate();

    if (mintNFT.gov_info) {
      axios
        .get("http://localhost:8080/doublecheck", mintNFT)
        .then((res) => {
          console.log(res);
          mintNFT.gov_info === mintNFT
          // mintNFT.gov_info.주민번호가 어떤식으로?
            ? (isCheckSuccess = true)
            : (isCheckSuccess = false);
        })
        .then(() => {

          isCheckSuccess
            ? alert("등기부 등본을 등록했습니다")
            : alert("등기부 등본 등록에 실패했습니다");
        });
    }
  }
  // console.log(mintNFT)
  // 매물관련 DB post

  async function postDB (event){
    event.preventDefault();
    // console.log(mintNFT);
    await handleClickCreate();
    // console.log(makingContract);
    const ContractWithSigner = await provider.send("eth_requestAccounts", []).then( _=>provider.getSigner()).then(signer=>
      makingContract.connect(signer)
    );
    // console.log(mintNFT.nft_imgURL);
    await ContractWithSigner.mintNFT(ethereum.selectedAddress, mintNFT.nft_imgURL);
    let TokenId = await ContractWithSigner.viewLastTokenID()
    TokenId = Number(TokenId)+1;
    setMintNFT({...mintNFT,
      // tokenid: TokenId,
    })
    mintNFT.tokenid = TokenId;
    // console.log(TokenId);
    // console.log(mintNFT);
    if(mintNFT.deposit && mintNFT.rental && mintNFT.description ) {
      axios.post("http://localhost:8080/estate/register",
        mintNFT,
        { headers: { authorization: `Bearer ${authorization}` } })
        .then((res) =>{
            console.log(res.data)
            
            setMintNFT({
              ...mintNFT,
                deposit: mintNFT.deposit ,
                rental: mintNFT.rental,
                description: mintNFT.description,
                types: mintNFT.types,
                address: mintNFT.nft_address
            })
        })
        .catch((e)=> console.log(e))
    }
  }

  console.log(mintNFT);


  return (
    <div className="mb-6 pt-4 mt-20">
      <div className="w-full py-10 px-4 bg-white flex flex-col items-center">
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-1 gap-8">
          <div className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
            <img
              className="w-20 mx-auto mt-[-3rem] bg-white"
              src="https://png.pngtree.com/png-vector/20220520/ourlarge/pngtree-contract-writing-icon-color-flat-png-image_4702613.png"
              alt="/"
            />
            <h2 className="text-2xl font-bold text-center py-8">NFT 등록</h2>
            <p className="text-center text-4xl font-bold">
              매물 등록 하는 방법
            </p>
            <div className="text-center font-medium">
              <p className="py-2 border-b mx-8 mt-8">
                실제 매물 사진을 등록해야 합니다
              </p>
              <p className="py-2 border-b mx-8">
                최신 등기부 등본을 등록해야 합니다
              </p>
              <p className="py-2 border-b mx-8">
                등록 사항에서 이상이 없으면 심사 후에 등록됩니다
              </p>
            </div>
          </div>
        </div>
      </div>
      <label className="grid justify-center items-center mb-5 pt-10 px-10 text-xl font-semibold text-[#07074D]">
        사진 등록
      </label>
      <div className="mb-8">
        {preview && <img src={preview} alt="preview" />}

        <label className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center">
          <div>
            <input
              type="file" multiple
              name="file"
              id="file"
              accept="image/*"
              onChange={handleImgChange}
              onSubmit={submitImage}
            />
          </div>
        </label>
      </div>

      {/* <Postcode /> */}
      <label className="grid justify-center items-center pt-10 mb-10 px-10 text-xl font-semibold text-[#07074D]">
        등기부 등본 등록
      </label>
      <div className="">
        <label className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center">
          <div>
            <input
              type="file"
              name="file"
              id="file"
              accept="application/pdf"
              onChange={handleInputValue('gov_info')}
              onSubmit={doublecheck}
            />
          </div>
        </label>
      </div>

      <div className="flex flex-col items-center justify-center  mx-auto">
        <div className="bg-white p-10 flex flex-col items-center justify-center w-full shadow-xl rounded-xl">
        <div className=" flex items-center justify-center">
          <div id="input" className="flex flex-col w-full my-5">
              <label for="username" className="text-gray-500 mb-2">
                부동산 종류
              </label>
              <input
                type="text"
                id="username"
                placeholder="전세or월세 를 입력해주시면 됩니다"
                value={mintNFT.types} onChange={handleInputValue("types")}
                className="text-black border border-blue-700 bg-white max-w-sm font-mono text-sm py-3 px-4 w-[500px] rounded-md"
              />
            </div>
          </div>
          <form action="" class="flex flex-col items-center">
            <div id="input" class="flex flex-col w-full my-5">
              <label for="username" class="text-gray-500 mb-2">
                보증금
              </label>
              <input
                value={mintNFT.deposit} onChange={handleInputValue('deposit')}
                type="text"
                id="username"
                className="text-black border border-blue-700 bg-white max-w-sm font-mono text-sm py-3 px-4 w-[500px] rounded-md"
              />
            </div>
            <div id="input" class="flex flex-col w-full my-5">
              <label for="username" class="text-gray-500 mb-2">
                월세
              </label>
              <input
                value={mintNFT.rental} onChange={handleInputValue('rental')}
                type="text"
                id="username"
                placeholder="전세의 경우 0을 입력해주시면 됩니다"
                className="text-black border border-blue-700 bg-white max-w-sm font-mono text-sm py-3 px-4 w-[500px] rounded-md"
              />
            </div>
            <div id="input" class="flex flex-col w-full my-5">
              <label for="username" class="text-gray-500 mb-2">
                건물주소
              </label>
              <input
                type="text"
                value={mintNFT.nft_address} onChange={handleInputValue("nft_address")}
                id="username"
                placeholder="서울특별시 강남구"
                className="text-black border border-blue-700 bg-white max-w-sm font-mono text-sm py-3 px-4 w-[500px] rounded-md"
              />
            </div>
            <div id="input" class="flex flex-col w-full my-5">
              <label for="username" class="text-gray-500 mb-2">
                건물 부가 설명
              </label>
              <input
                value={mintNFT.description} onChange={handleInputValue('description')}
                type="text"
                id="username"
                placeholder="예시) 가구 옵션, 관리비 여부"
                className="text-black border border-blue-700 bg-white max-w-sm font-mono text-sm py-3 px-4 w-[500px] rounded-md"
              />
            </div>
            <div id="button" class="flex flex-col w-full my-5">
              <div class="flex justify-evenly mt-5"></div>
            </div>
          </form>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <button
        type="submit"
          onClick={postDB}
          className="mt-20 mx-4 flex justify-center items-center text-white bg-indigo-500 
        border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          매물 등록하기
        </button>
      </div>
    </div>
  );
}
