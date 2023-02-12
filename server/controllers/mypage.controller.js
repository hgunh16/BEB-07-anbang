const Estate = require('../models/estate');
const jwt = require('jsonwebtoken');
const {Op} =require('sequelize');

module.exports ={

    mypage : async(req,res,next)=>{
      // 로그인 검증
      const authorization = req.headers['authorization'];
      console.log(authorization)
      if (!authorization) {
          return res.status(400).json({ data: null, message: 'invalid access token' });
      }
    
        try {
          const token = authorization.split(' ')[1];
          const data = jwt.verify(token, process.env.ACCESS_SECRET);

          //accessToken이 있는 경우, accessToken내 갖고 있는 user.Id로 OwnedEstate조회
          // if(data)
          {
            const ownedEstate = await Estate.findAll({
                where :{
                    owner : data.id,
                }
            });
            //contractor
            const contractingEstate = await Estate.findAll({
              where : {
                contractor : {
                  [Op.ne] : null
                }
              }
            })
             return res.status(200).json({ownedEstate,contractingEstate});
          }
          
          
        } catch (err) {
          console.log(err)
        }
    }
}