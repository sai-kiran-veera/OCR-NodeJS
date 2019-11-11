var express=require('express');
var users=express.Router();
var mongoose=require('mongoose');
var database=require('./database/db');
var bcrypt=require('bcrypt');
var jwt=require('jsonwebtoken')
var secret='secret'

var url=database.url;

users.post('/Login',(req,res)=>{
var email=req.body.email
var password=req.body.password
console.log(email,password)
var query={email:email}
mongoose.connect(url,(err,db)=>{
if(err) throw err
console.log('connected to db')
db.collection('emp').findOne(query,(err,doc)=>{
    if(err) throw err
    console.log(doc.email)
    if(email==null){
        res.send('email id not found')
    }
    
       else{
        console.log(doc.password)
        if(bcrypt.compareSync(password,doc.password)){
            var token=jwt.sign({password:doc.password},secret,{
                expiresIn:'1h'
            })
            console.log(token)
                
            if(token){
                console.log('in verify block')
                jwt.verify(token,secret,(err,data)=>{
                    if(err) {
                        res.send(err)
                    }
                    else{

                    console.log('authenticated');
                    res.send('Login Sucessfull  Token:'+token)
                }
            })
            }
        }
        else{
            res.send('invalid token')
        }

       }
    

})
})
})

module.exports=users