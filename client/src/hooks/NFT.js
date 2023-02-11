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

export default function Mypage(props) {

    const [NFTInfo, setNFTInfo] = useState([])

    const navigate = useNavigate();

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const makingContract = new ethers.Contract(NFT_contractAddress, erc721_ABI, provider);

    const NFTClick = () => {
        navigate("/NFTdetail", { state: {
            types: NFTInfo.types,
            imgURL: NFTInfo.nft_imgURL,
            address: NFTInfo.nft_address,
            deposit: NFTInfo.deposit,
            rental: NFTInfo.rental,
            description: NFTInfo.description,
            tokenId: NFTInfo.tokenId
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
  
    //ipfs 받아오는 이미지 url
    useEffect(async () => {
      console.log(NFTInfo[4].tokenId);
      // makingContract.tokenURI(NFTInfo[4].tokenId).then(console.log);
      const tokenURL = await makingContract.tokenURI(96);
      console.log(tokenURL);
      axios
        .get(tokenURL)
        .then((res) => {
          setNFTInfo({
              ...NFTInfo,
              nft_imgURL: res.data,
              nft_address: res.data,
              types: res.data
          });
        })
        .catch((err) => console.log(err));
    }, [NFTInfo]);

    //   console.log(NFTInfo)

    return(
    <div className="flex flex-row">
        {NFTInfo && NFTInfo.map((post)=> (
            <div>
            <div className="mt-5 w-[340px] h-[270px] rounded-xl mb-5">
            <div className="border shadow-lg rounded-lg hover:scale-105 duration-300">
            <img onClick={()=> NFTClick()} 
            className="w-full h-[200px] object-cover rounded-t-lg" 
            src={NFTInfo.nft_imgURL}></img>
                <p className="mt-10 flex flex-row justify-center items-center">{`임대종류 : ${post.types}`}</p>
                <p className="mt-5 flex flex-row justify-center items-center">{`주소 : ${post.nft_address}`}</p>   
                <p className="mt-5 flex flex-row justify-center items-center">{`보증금 : ${post.deposit}`}</p> 
                <p className="mt-5 flex flex-row justify-center items-center">{`월세 : ${post.rental}`}</p> 
            </div>
        </div>
        </div>
        ))}
    </div>


    )
}