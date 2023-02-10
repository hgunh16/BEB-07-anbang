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

// ERC20 토큰으로 ERC721 NFT를 mint
router.post('/',async (req,res)=>{
    // const {address, image, types} = req.body;
    const tempImg = 'https://urclass-images.s3.ap-northeast-2.amazonaws.com/beb/section4/unit4/Gray.png';
    console.log('hello');
    res.send('hello');
    // const user_id = req.session.user_id;
    console.log("minting")
    // await caver.klay.getBalance("0x23802188302BDFc1fdA5246211698227873D7Db2").then(console.log);
    
    // const erc721Contract = caver.contract.create(erc721_ABI,"0x63c2b6625dA172860Aa79b528AA06D125821d029");

    // await erc721Contract.methods.name().call(console.log)
    // await caver.klay.getTransactionCount("0x23802188302BDFc1fdA5246211698227873D7Db2").then(console.log);

    // const keyring = caver.wallet.keyring.createFromPrivateKey(server_privatekey);
    // console.log(keyring)
    // caver.wallet.add(keyring);
    // const gasPrice = await caver.klay.getGasPrice();

    console.log(erc20Contract);
    // Sign to the transaction
    // const signed = await caver.wallet.sign(keyring.address, vt)

    // const receipt = await caver.rpc.klay.sendRawTransaction(signed)
    // console.log(receipt)
    // const receipt = await erc721Contract.send({ from: keyring.address, gas: '0x4bfd200' }, 'mintNFT', server_address, tempImg);
    // await erc721Contract.send({from:'0x23802188302BDFc1fdA5246211698227873D7Db2', gas: '1000000'}, 'mintNFT', server_address,server_address,tempImg)
    
    // console.log(erc721Contract.methods);
    // return res.status(200).send({status:"success", message:"img 업로드 성공"});

    // let privateKey;
    // // console.log(address);
    // server_keystore.keyFromPassword(server_password, (err, data) => {

    //     const key = server_keystore.exportPrivateKey(server_address.toString(), data);

    //     privateKey = '0x' + key;
    //     // console.log(privateKey);
    //     res.status(200).send({status:"success", message:"img 업로드 성공"});
    //     erc20Contract.methods.allowance(server_address, erc721ContractAddr).call().then(console.log);
    //     db.query('SELECT * FROM user WHERE user_id = ?','server',function(err,results){
    //         if(err) console.log(err);
    //         console.log(results[0].user_accountAddress);
    //         return mintNFT_erc721(server_address, privateKey,results[0].user_accountAddress, tempImg);
    //     })
        
    // });
})

// router.get('/hello', (req, res) => {
//   console.log('hello');
//   res.send('hello');
// });

// async function approve_erc20(address, privateKey) {
//     var txObj = {
//       nonce: web3.eth.getTransactionCount(address),
//       gasPrice: web3.eth.gasPrice,
//       gasLimit: 1000000,
//       to: erc20ContractAddr,
//       from: address,
//       value: '',
//       data: erc20Contract.methods.approve(erc721ContractAddr, '100').encodeABI(),
//     };
  
//     try {
//       const signedTx = await web3.eth.accounts.signTransaction(
//         txObj,
//         privateKey,
//       );
//       const approveResult = await web3.eth.sendSignedTransaction(
//         signedTx.rawTransaction,
//       );
  
//       console.log(approveResult);
//       return approveResult;
//     } catch (e) {
//       console.log(e);
//       return e;
//     }
//   }

async function mintNFT_erc721(address,privateKey,server, imgURL) {
    erc20Contract.methods.allowance(address, erc721ContractAddr).call().then(console.log);
    await approve_erc20(address,privateKey);
    erc20Contract.methods.allowance(address, erc721ContractAddr).call().then(console.log);
    var txObj = {
      nonce: web3.eth.getTransactionCount(address),
      gasPrice: web3.eth.gasPrice,
      gasLimit: 1000000,
      to: erc721ContractAddr,
      from: address,
      value: '',
      data: erc721Contract.methods
        .mintNFT(address,server,imgURL).encodeABI(),
    };
  
    try {
      const signedTx = await web3.eth.accounts.signTransaction(
        txObj,
        privateKey,
      );
      const mintNFTResult = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
      );
  
      console.log(mintNFTResult);
      erc20Contract.methods.balanceOf(address).call().then(console.log);
      return mintNFTResult;
    } catch (e) {
      console.log(e);
      return e;
    }
}

module.exports = router;