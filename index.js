var express=require('express');
var app=express();
var bodyparser=require('body-parser');
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
var port=process.env.port||3000
var passport=require('passport');
var session=require('express-session')
var expressvalidator=require('express-validator')
app.use(expressvalidator())
var Register=require('./app/Register');{
app.use('/Register',Register)
}

var Login=require('./app/Login');{
    app.use('/Login',Login)
}
var Home=require('./app/Home');{
    app.use('/Home',Home)
}

app.listen(port,(err,data)=>{
    if(err) throw err
    console.log('Server is running at port'+port)
})