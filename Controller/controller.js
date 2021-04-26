
const mongoose = require('mongoose')
const model = require('../Model/model')
const Web3EthAccounts = require("web3-eth-accounts");

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
module.exports = {
 
  signup: async(req, res) => {
    
  try{
    if(!req.body.name ||!req.body.email || !req.body.password ){
      return  res.json({ responseCode: 404, responseMessage: "Invalid Credentials" })
   }else{
     let user =await model.findOne({email:req.body.email})
     if(user){return res.json({responseCode:400,responseMessage:"Already email exist"})}
     
     let account = await new Web3EthAccounts("ws://localhost:8546");
     let accountDetails = await account.create();

     req.body.ethAdress=accountDetails.address;
     req.body.ethPrivateKey=accountDetails.privateKey;
     let salt = bcrypt.genSaltSync(10);
     let hash = await bcrypt.hashSync(req.body.password, salt);
     req.body.password = hash;
           let userData =  new model(req.body);
           let resultFinal = await userData.save();
           return  res.json({ responseCode: 200, responseMessage: "Signup Successful",result: resultFinal})
   }
  }catch(err){
  
    return  res.json({ responseCode: 404,result: err})
  }

  },

  
  login: async(req, res) => {
    if(!req.body.email || !req.body.password){
      return res.send({responseCode: 404, responseMessage: "Invalid Credentials"})
    }else{
      let userData = await model.findOne({email:req.body.email});
    
      if(!userData){ return  res.send({ responseCode: 404, responseMessage: "Wrong email"})
    }
      let verifiedPassword = bcrypt.compareSync(req.body.password, userData.password);
      if(!verifiedPassword){ return  res.send({ responseCode: 404, responseMessage: "Wrong password"})}
      generateAuthToken = (user, time) => {
        let obj;
        if (time) obj = {
            expiresIn: time
        }
        return new Promise((resolve, reject) => {
            let token = jwt.sign({
                _id: user._id.toString()
            }, 'secret', obj).toString();
            resolve(token);
        });
    };
      let token = await generateAuthToken(userData._id, ("1h") || null);
     if(token){
      return res.send({ responseCode: 200, responseMessage: 'Login successful',result:userData, token: token })
   
     }
    }
    },



}//////ends of exports//////////////////////