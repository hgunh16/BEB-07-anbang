// modules
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ReactDOM from 'react-dom'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import ipfs from "ipfs-http-client";

// stylesheet
import "../assets/css/main.css";
import { Description } from "@ethersproject/properties";
import {erc721_ABI, NFT_contractAddress} from '../contract/NFT_ABI';
import {ethers} from "ethers"

let imgURL=[];
let nft_address = [];
let once =0;
export default  function NFT() {
  
    const [NFTInfo, setNFTInfo] = useState([])
    const [render,setRender] = useState(0);
    const navigate = useNavigate();


    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const makingContract = new ethers.Contract(NFT_contractAddress, erc721_ABI, provider);

    const NFTClick = (types, imgURL, address, deposit, rental, description,tokenId) => {
      once = 0;
      navigate("/NFTdetail", { state: {
        types: types,
        imgURL: imgURL,
        address: address,
        deposit: deposit,
        rental: rental,
        description: description,
        tokenId: tokenId
      }});
    };
    
    function loadData(){
      if(once >= 5) return;
      axios
        .get("http://localhost:8080/estate", NFTInfo)
        .then((result) => {
          // console.log(result.data);
          fetchData([...result.data]);
          setNFTInfo([...result.data])
          // NFTInfo = [...result.data];
          once++;
          setRender(render+1);
        })
        .catch((err) => console.log(err));
    };

    loadData();

    // makingContract.tokenURI(96).then(e=>console.log(e));
    //ipfs 받아오는 이미지 url
    
    async function fetchData(data) {
      // console.log(makingContract);
      // console.log(NFTInfo[4].tokenId);
      // makingContract.tokenURI(NFTInfo[4].tokenId).then(console.log);
      data.map(async (e)=>{
        let tokenId = e.tokenId;
        console.log(tokenId)
        const tokenURL = await makingContract.tokenURI(tokenId);
        console.log(tokenURL);
        await axios
          .get(`https://cors-anywhere.herokuapp.com/${tokenURL}`)
          .then((res) => {
            // setNFTInfo(prevNFTInfo => [...prevNFTInfo, {
            //   nft_imgURL: res.data.imgFile,
            //   types: res.data.types,
            //   nft_address: res.data.nft_address
            // }]);
            nft_address[tokenId] = res.data.nft_address;
            imgURL[tokenId] = res.data.imgFile;
            // console.log(imgURL[120])
          })
          .catch((err) => console.log(err));
      })
      
    }
  // let result = await fetchData(120);
  // console.log(a)
  
  console.log(NFTInfo)      
    return(
    <div className="grid grid-flow-row gap-10 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {NFTInfo && NFTInfo.map((post)=> (
            <div>
            <div className="px-6 my-8 mt-20 w-[340px] h-[270px] rounded-xl mb-5">
            <div className="border shadow-lg rounded-lg hover:scale-105 duration-300">
            {render && <img onClick={()=> NFTClick(
                post.types,
                post.nft_imgURL,
                post.nft_address,
                post.deposit,
                post.rental,
                post.description,
                post.tokenId
            )} 
            className="w-full h-[200px] object-cover rounded-t-lg" 
            src={imgURL[post.tokenId]}></img>}
                <p className="mt-5 flex flex-row justify-center items-center">{`임대종류 : ${post.types}`}</p>
                <p className="mt-5 flex flex-row justify-center items-center">{`주소 : ${nft_address[post.tokenId]}`}</p>   
                <p className="mt-5 flex flex-row justify-center items-center">{`보증금 : ${post.deposit}`}</p> 
                <p className="mt-5 mb-3 flex flex-row justify-center items-center">{`월세 : ${post.rental}`}</p> 
            </div>
        </div>
        </div>
        ))}
    </div>

    )
}