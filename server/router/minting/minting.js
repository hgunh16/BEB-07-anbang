const express = require('express');
const router = express.Router();
const Caver = require('caver-js');

require('dotenv').config();
const { server_address, server_privatekey } = process.env;

const { erc721_ABI,  } = require('../../contract/web3js/NFT_ABI');
const { erc20_ABI, erc20ContractAddr } = require('../../contract/web3js/ABI');
const caver = new Caver('https://api.baobab.klaytn.net:8651/'); //ganache provider

const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider('https://api.baobab.klaytn.net:8651/')); //ganache provider

const erc20Contract = new web3.eth.Contract(erc20_ABI, erc20ContractAddr); //erc20 contract 인스턴스화


const contract_type ={
  charter: 0, //전세
  monthly: 1 //월세
}

const vote_Status = {
  OK: 0,
  NO: 1,
  Wait: 2
}


// ERC20 토큰으로 ERC721 NFT를 mint
router.post('/',async (req,res)=>{
    // const {address, image, types} = req.body;
    const landlord_address = '0x23802188302BDFc1fdA5246211698227873D7Db2'
    const lessee_address = '0x23802188302BDFc1fdA5246211698227873D7Db2'

    const landlord_special = '임대인_특약'
    const lessee_special = '임차인_특약'

    const contractType = contract_type.charter;
    const deposit = 1;
    const maintenance = 1;
    const building_status = '정상'
    
    const tokenid = 1;
    const nft_address = '0x6c475b4cb1e8cdedf69706cb2b88b75b764d482f'

    console.log('hello');
    res.send('hello');
    console.log("minting")

    console.log(web3.eth.accounts)
    web3.eth.getTransactionCount(server_address).then(console.log);
    console.log(web3.eth.gasPrice);
    var txObj = {
      nonce: web3.eth.getTransactionCount(server_address),
      gasPrice: web3.eth.gasPrice,
      gasLimit: 1000000,
      to: erc20ContractAddr,
      from: server_address,
      value: '',
      data: erc20Contract.methods.proposal(landlord_address,lessee_address,landlord_special,lessee_special,contractType,deposit,maintenance,building_status,tokenid,nft_address).encodeABI(),
    };

    await erc20Contract.methods.proposal(landlord_address,lessee_address,landlord_special,lessee_special,contractType,deposit,maintenance,building_status,tokenid,nft_address);

})

// router.get('/hello', (req, res) => {
//   console.log('hello');
//   res.send('hello');
// });

async function approve_erc20(address, privateKey) {
    var txObj = {
      nonce: web3.eth.getTransactionCount(address),
      gasPrice: web3.eth.gasPrice,
      gasLimit: 1000000,
      to: erc20ContractAddr,
      from: address,
      value: '',
      data: erc20Contract.methods.approve(erc721ContractAddr, '100').encodeABI(),
    };
  
    try {
      const signedTx = await web3.eth.accounts.signTransaction(
        txObj,
        privateKey,
      );
      const approveResult = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
      );
  
      console.log(approveResult);
      return approveResult;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

module.exports = router;