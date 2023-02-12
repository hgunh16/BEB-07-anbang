const TenantAgreement =require('../models/tenantagreement');
const OwnerAgreement = require('../models/owneragreement');
const Estate = require('../models/estate');
const jwt = require('jsonwebtoken');
const {Op} = require('sequelize');
const {sequelize} = require('../models');
// const { MAXIMUM_KEY_NUM } = require('caver-js/types/packages/caver-wallet/src/keyring/keyringHelper');

const { erc20_ABI, erc20ContractAddr } = require('../contract/web3js/ABI');

require('dotenv').config();
const { server_address, server_privatekey } = process.env;

const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider('https://api.baobab.klaytn.net:8651/')); //ganache provider

const erc20Contract = new web3.eth.Contract(erc20_ABI, erc20ContractAddr); //erc20 contract 인스턴스화

module.exports= {
    tenantcheck: async(req,res,next)=>{
        const authorization = req.headers['authorization'];
        if (!authorization) {
            return res.status(400).json({ data: null, message: 'invalid access token' });
        }
        try{
            const token = authorization.split(' ')[1];
            const data =jwt.verify(token,process.env.ACCESS_SECRET);
            if(data){
                //특약 , 계약할 부동산 토큰 아이디 입력
                const {tenantAgreement, tenantestateTokenId} = req.body;
                
                    if (!tenantAgreement || !tenantestateTokenId) {
                        return res.status(400).json({ data: null, message: 'Invalid input' });
                    }
                    //임차인 특약사항 작성
                    const newTenantAgreement = await TenantAgreement.create({
                        tenantAgreement,
                        tenantId : data.id,
                        tenantestateTokenId,
                    })
                    // 부동산에 임차인 계약요청으로 업데이트
                    await Estate.update({
                        contractor : data.id,
                    },{
                        where : {tokenId : newTenantAgreement.tenantestateTokenId}
                    })
                return res.status(200).json(newTenantAgreement);
            }
    
       }catch(err){
        console.error(err)
        next(err)
       }
    },
    
   ownercheck: async(req,res,next)=>{
    const authorization = req.headers['authorization'];
    if (!authorization) {
        return res.status(400).json({ data: null, message: 'invalid access token' });
    }
    try{
        const token = authorization.split(' ')[1];
        const data =jwt.verify(token,process.env.ACCESS_SECRET);
        if(data){
            //특약 , 계약할 부동산 토큰 아이디 입력
            const {ownerAgreement, ownerestateTokenId} = req.body;
      
                if (!ownerAgreement || !ownerestateTokenId) {
                    return res.status(400).json({ data: null, message: 'Invalid input' });
                }
                
                const newOwnerAgreement = await OwnerAgreement.create({
                    ownerAgreement,
                    ownerId : data.id,
                    ownerestateTokenId
                })
            return res.status(200).json(newOwnerAgreement);
        }

   }catch(err){
    console.error(err)
    next(err)
   }
},

   write: async(req,res,next)=>{
    const authorization = req.headers['authorization'];
    if (!authorization) {
        return res.status(400).json({ data: null, message: 'invalid access token' });
    }
    try{
        const token = authorization.split(' ')[1];
        const data = jwt.verify(token,process.env.ACCESS_SECRET);
        if(data){
            //tenantAgreement와 OwnerAgreement가 포함된 Estate 보여주기
            
            const contractEstate = await Estate.findOne({
                include :[{
                    model : TenantAgreement,
                    where : {
                        tenantestateTokenId,
                    },
                    attributes : ['tenantAgreement']
                },
                {
                    model : OwnerAgreement,
                    where : {
                        ownerestateTokenId,
                    },
                    attributes : ['ownerAgreement']
                }
                ]
            })
            // const updateEstate = await contractEstate.update({})
            return res.status(200).json({data: contractEstate, message : "contract Success"})
            // 계약된 부동산 isSelling false 

        }
   }catch(err){
        console.error(err)
        next(err)
    }
    },

    make: async (req,res)=>{
        const {landlord_address, deposit, types, agreement, tokenId} = req.body;
        console.log(req.body);

        // const landlord_address = address
        const lessee_address = '0x23802188302BDFc1fdA5246211698227873D7Db2'

        // const landlord_special = agreement.tenantAgreement;
        // const lessee_special = agreement.tenantAgreement;

        const landlord_special = '0';
        const lessee_special = 'agreement.tenantAgreement';

        const contractType = 0;
        // const deposit = 1;
        const maintenance = 1;
        const building_status = '정상'
        
        // const tokenId = 1;
        const nft_address = '0x6c475b4cb1e8cdedf69706cb2b88b75b764d482f'

        console.log('hello');
        res.send('hello');

        var txObj = {
            nonce: web3.eth.getTransactionCount(server_address),
            gasPrice: web3.eth.gasPrice,
            gasLimit: 1000000,
            to: erc20ContractAddr,
            from: server_address,
            value: '',
            data: erc20Contract.methods.proposal(landlord_address,lessee_address,landlord_special,lessee_special,contractType,deposit,maintenance,building_status,tokenId,nft_address).encodeABI(),
        };
        const signedTx = await web3.eth.accounts.signTransaction(
            txObj,
            server_privatekey,
        );
        const approveResult = await web3.eth.sendSignedTransaction(
            signedTx.rawTransaction,
        );
        console.log(approveResult);
        erc20Contract.methods.getProposal(tokenId).call().then(console.log)
    }
}