// modules
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ReactDOM from 'react-dom'
import { useNavigate } from 'react-router-dom';
import axios from "axios";

// stylesheet
import "../assets/css/main.css";
import { Description } from "@ethersproject/properties";
import {erc721_ABI, NFT_contractAddress} from '../contract/NFT_ABI';
import {ethers} from "ethers"

export default function NFT() {

    const [NFTInfo, setNFTInfo] = useState([])
 
    const navigate = useNavigate();


    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const makingContract = new ethers.Contract(NFT_contractAddress, erc721_ABI, provider);

    const NFTClick = (types, imgURL, address, deposit, rental, description) => {
        navigate("/NFTdetail", { state: {
            types: types,
            imgURL: imgURL,
            address: address,
            deposit: deposit,
            rental: rental,
            description: description,
        }});
      };


    useEffect(() => {
        axios
          .get("http://localhost:8080/estate", NFTInfo)
          .then((result) => {
            // console.log(result.data);
            setNFTInfo([...result.data])
          })
          .catch((err) => console.log(err));
      }, []);

      console.log(NFTInfo)
    
      makingContract.tokenURI(96).then(e=>console.log(e));
      //ipfs 받아오는 이미지 url
      useEffect(() => {
        async function fetchData() {
          console.log(makingContract);
          console.log(NFTInfo[4].tokenId);
          // makingContract.tokenURI(NFTInfo[4].tokenId).then(console.log);
          const tokenURL = await makingContract.tokenURI(96);
          console.log(tokenURL);
          axios
            .get(`https://cors-anywhere.herokuapp.com/${tokenURL}`)
            .then((res) => {
              NFTInfo([...res.data]);
            })
            .catch((err) => console.log(err));
        }
        fetchData();
      }, [NFTInfo]);

    console.log(NFTInfo)

    return(
    <div className="grid grid-flow-row gap-10 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {NFTInfo && NFTInfo.map((post)=> (
            <div>
            <div className="px-6 my-8 mt-20 w-[340px] h-[270px] rounded-xl mb-5">
            <div className="border shadow-lg rounded-lg hover:scale-105 duration-300">
            <img onClick={()=> NFTClick(
                post.types,
                post.nft_imgURL,
                post.nft_address,
                post.deposit,
                post.rental,
                post.description,
            )} 
            className="w-full h-[200px] object-cover rounded-t-lg" 
            src={post.nft_imgURL}></img>
                <p className="mt-5 flex flex-row justify-center items-center">{`임대종류 : ${post.types}`}</p>
                <p className="mt-5 flex flex-row justify-center items-center">{`주소 : ${post.nft_address}`}</p>   
                <p className="mt-5 flex flex-row justify-center items-center">{`보증금 : ${post.deposit}`}</p> 
                <p className="mt-5 mb-3 flex flex-row justify-center items-center">{`월세 : ${post.rental}`}</p> 
            </div>
        </div>
        </div>
        ))}
    </div>

    )
}