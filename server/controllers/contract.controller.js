const TenantAgreement =require('../models/tenantagreement');
const OwnerAgreement = require('../models/owneragreement');
const Estate = require('../models/estate');
const jwt = require('jsonwebtoken');
const {Op} = require('sequelize');
const {sequelize} = require('../models')

require('dotenv').config()

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
    }
}