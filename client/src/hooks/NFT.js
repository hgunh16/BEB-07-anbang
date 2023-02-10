// modules
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ReactDOM from 'react-dom'
import { useNavigate } from 'react-router-dom';
import axios from "axios";

// stylesheet
import "../assets/css/main.css";
import { Description } from "@ethersproject/properties";

export default function Mypage(props) {

    const [NFTInfo, setNFTInfo] = useState([])

    const navigate = useNavigate();

    const NFTClick = () => {
        navigate("/NFTdetail", { state: {
            type: NFTInfo.nft_type,
            imgURL: NFTInfo.nft_imgURL,
            address: NFTInfo.nft_address,
            deposit: NFTInfo.deposit,
            rental: NFTInfo.rental,
            description: NFTInfo.description
        }});
      };

    useEffect(() => {
        axios
          .get("http://localhost:8080/estate", NFTInfo)
          .then((result) => {
            setNFTInfo([...result.data])
          })
          .catch((err) => console.log(err));
      }, []);


    //ipfs 받아오는 이미지 url
    useEffect(() => {
        axios
          .get(`https://ipfs.io/ipfs/${NFTInfo.nft_imgURL}`)
          .then((result) => {
            setNFTInfo({
                ...NFTInfo,
                nft_imgURL: result.data,
                nft_address: result.data,
                nft_type: result.data
            });
          })
          .catch((err) => console.log(err));
      }, [NFTInfo]);


    return(
    <div className="flex flex-row items-center">
        {NFTInfo && NFTInfo.map((post)=> (
            <div>
            <div className="mt-5 w-[340px] h-[270px] rounded-xl mb-5">
            <div className="border shadow-lg rounded-lg hover:scale-105 duration-300">
            <img onClick={()=> NFTClick()} 
            className="w-full h-[200px] object-cover rounded-t-lg" 
            src={NFTInfo.nft_imgURL}></img>
                <p className="mt-10 flex flex-row justify-center items-center">{`임대종류 : ${post.nft_type}`}</p>
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