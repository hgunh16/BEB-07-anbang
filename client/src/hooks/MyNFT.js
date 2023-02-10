// modules
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ReactDOM from 'react-dom'
import { useNavigate } from 'react-router-dom';
import axios from "axios";

// stylesheet
import "../assets/css/main.css";

export default function Mypage(props) {

const [ownedEstate, setOwnedEstate] = useState([]);
const [contractingEstate, setContractingEstate] = useState([]);
const [NFTInfo, setNFTInfo] = useState({});

useEffect(() => {
  axios
    .get("http://localhost:8080/mypage/:id", NFTInfo)
    .then((result) => {
      setOwnedEstate(result.data.ownedEstate);
      setContractingEstate(result.data.contractingEstate);
    })
    .catch((err) => console.log(err));
}, []);

//   //ipfs 받아오는 이미지 url
useEffect(() => {
  axios
    .get(`http://making.infura-ipfs.io/ipfs/${NFTInfo.nft_imgURL}`)
    .then((res) => {
      setNFTInfo({
        ...NFTInfo,
        nft_imgURL: res.data,
        nft_address: res.data,
        types: res.data,
      });
    })
    .catch((err) => console.log(err));
}, [NFTInfo]);

  // const [NFTInfo, setNFTInfo] = useState({});
  // const {ownedEstate, contractingEstate} = NFTInfo;
    const navigate = useNavigate();

    const NFTClick = () => {
        navigate("/NFTdetail", { state: {
            types: NFTInfo.types,
            imgURL: NFTInfo.nft_imgURL,
            address: NFTInfo.nft_address,
            deposit: NFTInfo.deposit,
            rental: NFTInfo.rental
        }});
      };

    useEffect(() => {
        axios
          .get("http://localhost:8080/mypage/:id", NFTInfo)
          .then((result) => {
            setNFTInfo([...result.data]);
          })
          .catch((err) => console.log(err));
      }, []);

    //ipfs 받아오는 이미지 url
    useEffect(() => {
        axios
          .get(`http://making.infura-ipfs.io/ipfs/${NFTInfo.nft_imgURL}`)
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
    

    return(
    <div className="flex flex-row">
        {ownedEstate.map((post)=> (
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
        {contractingEstate.map((post)=> (
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