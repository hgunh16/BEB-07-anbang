const Estate = require('../models/estate');
const Report = require('../models/report');
const jwt = require('jsonwebtoken');

module.exports = {
    getAllEstate : async(req,res,next)=> {
        try {
            const estates = await Estate.findAll({}); // 
      
            res.json(estates);
          } catch (err) {
            console.error(err);
            next(err);
          }
    },
    getEstateDetail : async(req,res,next)=>{
        try {
            const estate = await Estate.findOne({
                where : {
                    id : req.params.id
                }
            })
            res.json(estate)
        }catch(err){
            console.error(err)
            next(err)
        }
    },
    register :  async(req,res,next)=>{
        //로그인 검증
        const authorization = req.headers['authorization'];
        console.log(req.headers)
        if (!authorization) {
            return res.status(400).json({ data: null, message: 'invalid access token' });
        }
        try{
            const token = authorization.split(' ')[1];
            const data =jwt.verify(token,process.env.ACCESS_SECRET);
            if(data)
            {
                const {types, deposit, rental, description, tokenid} = req.body;
                console.log(req.body);
                console.log(tokenid);
                if (!types || !deposit || !description) {
                    return res.status(400).json({ data: null, message: 'Invalid input' });
                }
                
                const newEstate = await Estate.create({
                    types,
                    deposit,
                    rental,
                    description,
                    isSelling : true,
                    tokenId: tokenid,
                    owner : data.id
                })
            return res.status(200).json(newEstate);
            }
        }catch(err){
            console.error(err.message);
            next(err);
          }
    },
    
    report: async(req,res,next)=>{
        const authorization = req.headers['authorization'];
        if (!authorization) {
            return res.status(400).json({ data: null, message: 'invalid access token' });
        }
        try{
            //로그인 확인
            const token = authorization.split(' ')[1];
            const data = jwt.verify(token, process.env.ACCESS_SECRET);
    
            //reportId, reporterId 들어갈 수 있게끔 조치
            if(data){
                const {reason} = req.body
                if (!reason){
                    return res.status(400).json({ data: null, message: 'Invalid input' });
                }
                const newReport = await Report.create({
                    reason,
                    reportId,
                    reporterId : data.id
                }) 
            
            return res.status(200).json({data : newReport, messgae: 'report success'});
            }
            }
    
        catch(err){
            console.error(err.message)
            next(err)
        }
    }
}