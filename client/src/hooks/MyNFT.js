// modules
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ReactDOM from 'react-dom'
import { useNavigate } from 'react-router-dom';
import axios from "axios";

// stylesheet
import "../assets/css/main.css";

export default function Mypage(props) {

    const [NFTInfo, setNFTInfo] = useState([])
    const navigate = useNavigate();

    const NFTClick = () => {
        navigate("/NFTdetail", { state: {
            type: NFTInfo.nft_type,
            imgURL: NFTInfo.nft_imgURL,
            address: NFTInfo.nft_address,
            deposit: NFTInfo.deposit,
            rental: NFTInfo.rental
        }});
      };

    useEffect(() => {
        axios
          .get("http://localhost:8080/estate/:id", NFTInfo)
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
    <div className="">
        {NFTInfo.map((post)=> (
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

 
    // <div className="mt-5 w-[340px] h-[270px] rounded-xl mb-5">
    //     <div className="border shadow-lg rounded-lg hover:scale-105 duration-300">
    //         <img className="w-full h-[200px] object-cover rounded-t-lg" onClick={()=> NFTClick()} 
    //         src="https://news.samsungdisplay.com/wp-content/uploads/2022/03/IT_tc00480001633_final-1024x449.jpg" alt=""></img>
    //         <div className="flex justify-between px-2 py-2">
    //             <div className="flex flex-col items-center">
    //                 <h3>가격</h3>
    //                 <h3>임대종류</h3>
    //             </div>
    //         </div>
    //     </div>
    // </div> 
    )
}