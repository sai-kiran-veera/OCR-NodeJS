var express=require('express');
var users=express.Router();
var mongoose=require('mongoose');
var database=require('./database/db');
var bcrypt=require('bcrypt');
var jwt=require('jsonwebtoken')
var secret='secret'

users.post('/Home',(req,res)=>{

    
    
var token=req.headers['token'];
console.log(token)
jwt.verify(token,secret,(err,data)=>{
    if(err) {
        res.send('Token is not valid')
    }
    else{
    res.send('Welcome to homepage')
    }
})

// if(token){
// console.log('in if block '+token)
// res.send('in home')
// }
// else{
//     console.log('please provide valid token')
//     res.send('please provide valid token')
// }
})
module.exports=users;

