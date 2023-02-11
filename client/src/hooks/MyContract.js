// modules
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ReactDOM from 'react-dom'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import {erc721_ABI, NFT_contractAddress} from '../contract/NFT_ABI';
import {ethers} from "ethers"

// stylesheet
import "../assets/css/main.css";


export default function MyContract() {


const location = useLocation();
console.log(location)

const types = location.state.types // 전세 or 월세
const address = location.state.address
const deposit = location.state.deposit
const rental = location.state.rental
const description = location.state.description
const contractPeriod = location.state.contractPeriod
const agreement = location.state.agreement


    return(
        <div>
            <p>{address}</p>
        </div>
    )
}