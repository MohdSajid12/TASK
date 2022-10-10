const bcrypt = require('bcrypt');
const op = require('sequelize');
const User = require('../model/signup');

const jwt = require('jsonwebtoken');
const { response } = require('express');
const token = 'cd622d0fbbf5aabf249e3579c0df3ab4382a2e291a3e9c26cba770f53a9bd33c2b75d1f2c4b585b3ac951e3704cf850d705e23430d1cf9a107e2b349d3172d91'

function generateAccessToken(id){
    return jwt.sign(id, token)
}

exports.signup = ((req, res) => {
try{
   const {name, email, contact, password,isAdmin} = req.body;
   bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(password, salt,function(err, hash){
        if(err){
            console.log('Unable to create new User');
            res.json({message:"Unable to create new User"});
        }
        User.create({name, email,contact, password:hash,isAdmin})
        .then(() => {
            res.status(201).json({message:"SuccessFully created user"});
        })
        .catch(err => {
            console.log(err);
            res.status(403).json(err);
        })
    })
   })
  
   
}
catch{
    err => {
        res.status(403).json(err);
    }
}
});

exports.login = ((req, res) => {
    try{
        const {email, password} = req.body;
        User.findAll({where:{email:email}}).then(result => {
            console.log("hiby",result[0].dataValues.isAdmin)
            if(result[0] != undefined){
                bcrypt.compare(password, result[0].password, (err, response) => {
                    if(err){
                        console.log(err);
                        return res.json({success: false, message: 'Something went wrong'});
                    }
                    if(result && result[0].dataValues.isAdmin==true){
                        console.log("Inside response", result[0].id);
                        console.log(response);
                        const jwtToken = generateAccessToken(result[0].id);
                        User.findAll().then((result1) =>{
                            for(let i=0;i<result[i].length;i++)
                            {
                                console.log(result[i].dataValues)
                            }
                        })
                       return res.json({token: jwtToken, success: true, message: " Admin Successfully logged In Userlist is in console"});
                         
                    }else if(result)
                    {
                        console.log("Inside response", result[0].id);
                        console.log(response);
                        const jwtToken = generateAccessToken(result[0].id);
                        User.findAll().then((result1) =>{
                            for(let i=0;i<result[i].length;i++)
                            {
                                console.log(result[i].dataValues)
                            }
                        })
                       return res.json({token: jwtToken, success: true, message: "Successfully logged In as user console,userlist not available"}); 
                    }
                    else{
                        //Not found
                        return res.status(401).json({success: false, message: 'PAssword does not match'});
                    }
                })
            }
            else{
                return res.status(401).json({success: false, message:"User not found"});
            }
        })
    }
    catch {
        err => {
            console.log(err);
        }
    }
});






