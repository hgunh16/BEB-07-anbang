const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

module.exports ={
    signUp: async(req,res,next) => {
        // console.log(req.body);
        const {email, password, nickname, name, phoneNumber, walletAddress, idNumber } = req.body;
        //null값 입력 방지
        if(!email ||!password ||!nickname ||!name||!phoneNumber ||!walletAddress||!idNumber ){
            return res.status(400).json({ data: null, message: 'Invalid input'})
        }
        // 1. 중복email
            const usedEmail = await User.findOne({
                where : {email} 
                })
            if(usedEmail){
                return res.json({errors : [{msg : 'This email already Exists'}] });
            }
    
        // 2. 중복 Nickname
        const usedNickname = await User.findOne({
            where : {nickname} 
            })
        if(usedNickname){
            return res.json({errors : [{msg : 'This nickname already Exists'}] });
        }
    
        // 3.중복 전화번호
        const usedPhoneNumber = await User.findOne({
            where : {phoneNumber} 
            })
        if(usedPhoneNumber){
            return res.json({errors : [{msg : 'This phoneNumber already Exists'}] });
        }
        // 4. 중복 지갑주소
        const usedWalletAddress = await User.findOne({
            where : {walletAddress} 
            })
        if(usedWalletAddress){
            return res.json({errors : [{msg : 'This walletAddress already Exists'}] });
        }
        //5. 중복 주민등록번호
        const usedIdNumber = await User.findOne({
            where : {idNumber} 
            })
        if(usedIdNumber){
            return res.json({errors : [{msg : 'This idNumber already Exists'}] });
        }
    
            try{
                const newUser = await User.create({
                    email,
                    password, 
                    nickname,
                    name,
                    phoneNumber,
                    walletAddress,
                    idNumber
                })
                return res.status(200).json(newUser);
            }
            catch(err){
            console.error(err.message);
            next(err);
        }
    },
    
    login: async(req,res,next)=>{
        try {
            const { email, password } = req.body;
            if (!email || !password) {
              return res.status(400).json({ data: null, message: 'Invalid input' });
            }
            const userData = await User.findOne({
              where: {
                email
              },
            });
            if (!userData) {
              return res.status(400).send({ data: null, message: 'no user' });
            }
    
            const match = await bcrypt.compare(password, userData.password);
            if (!match) {
              return res.status(400).send('user password invalid');
            }else{
                const accessToken = jwt.sign(
                 {
                    email : userData.email,
                    nickname : userData.nickname,
                    createdAt:userData.createAt,
                    id:userData.id,
                    iat : Math.floor(Date.now()/1000),
                    exp : Math.floor(Date.now() / 1000 )+ 60 *60,
                 },
                    process.env.ACCESS_SECRET
            );
    
            const refreshToken = jwt.sign(
                {
                    email : userData.email,
                    nickname : userData.nickname,
                    createdAt:userData.createAt,
                    id:userData.id,
                    iat : Math.floor(Date.now()/1000),
                    exp : Math.floor(Date.now() / 1000 )+ 60 *60,
                },
                process.env.REFRESH_SECRET
            );
    
            res.cookie('refreshToken', refreshToken, {
                maxAge: 10000,
                sameSite: true,
                secure: true,
                httpOnly: true,
              });
    
              res
              .status(200)
              .json({data: {accessToken : accessToken, userData}, message : 'login complete'})
              
            }
        }catch(err){
            console.error(err.message);
            next(err);
        }
        // res.status(200).json({message : 'login complete'})
    },
    
    logout: async(req,res,next)=>{
    //    const refreshToken = req.headers['refreshToken'];
       //console.log(req.headers)
       const refreshToken = req.headers['refreshtoken'];
        try{
            // console.log(refreshToken)
            console.log(refreshToken)
           
            if(!refreshToken){
                console.log("NRT")
                console.log(req.refreshtoken)
                return res
                .status(201)
                .json({messgage : 'no refresh token', status:'ok'});
            }
            res.clearCookie('refreshToken', {
                sameSite :'none',
                secure: true,
                maxAge : 1,
                httpOnly : true,
            });
            return res
            .status(200).json({
                message : 'logout successfully',
                status :'ok'
            })
        }catch(err){
            // console.log(refreshToken)
            console.error(err);
            next(err);
        }
    },

    valid : async(req,res,next)=>{
        const authorization = req.headers['authorization'];
        console.log(req)
        if (!authorization) {
          return res.status(400).json({ data: null, message: 'invalid access token' });
        }
    
        try {
          const token = authorization.split(' ')[1];
          const data = jwt.verify(token, process.env.ACCESS_SECRET);
    
          if(data){
            return res.status(200).json({
              data: {
                email: data.email,
                nickname: data.nickname,
                createdAt: data.createdAt,
              },
              message: 'ok',
            });
          }
          
          return res.status(400).json({ data: null, message: 'invalid access token' });
        } catch (err) {
          res.status(400).json({ data: null, message: 'invalid access token' });
        }
    }
}