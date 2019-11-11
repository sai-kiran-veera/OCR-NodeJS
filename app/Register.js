var express=require('express');
var users=express.Router();
var mongoose=require('mongoose');
var database=require('./database/db');
var bcrypt=require('bcrypt');

var url=database.url
users.post('/Register',(req,res)=>{
    
    console.log('in register')
    var email=req.body.email;
    var password=req.body.password;
    var confirmpassword=req.body.confirmpassword;
    console.log(email, password)
  
    console.log(url)
    req.checkBody('email','email is required').notEmpty();
    req.checkBody('email','email is not valid').isEmail();
    req.checkBody('password','password is required').notEmpty();
    req.checkBody('confirmpassword','confirm password is required').notEmpty();
    req.checkBody('confirmpassword','passwords are not matching').equals(password)
    var errors=req.validationErrors();
                if(errors){
                    res.send(errors)
                }
                else{

    mongoose.connect(url,(err,db)=>{
        if(err) throw err
        var query={'email':email}
        db.collection('emp').findOne(query,(err,doc)=>{
          
            if(JSON.stringify(doc)=='null'){
                
                 console.log('no errors')
                  
                mongoose.connect(url,(err,db)=>{
            
                    if(err) throw err
                    console.log('connected')
                
                    var obj={email:email,password:bcrypt.hashSync(password,10)}
                    db.collection('emp').insertOne(obj,(err,doc)=>{
            
                        if(err) throw err
                        console.log('data inserted')
                        res.status(200).json("user created succesfully")  
                    })
            
                })
            
                                  
            
            }
            else{
                console.log('email already exist')
                res.send('email already exist')
               

              
            }
        })
        
    })
}

   

})

module.exports=users;
