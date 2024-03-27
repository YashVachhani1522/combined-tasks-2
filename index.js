const express=require('express');
const path = require('path');
const router = require('../routes/main-login-project/practical-1');
const app=express();
var cookieParser = require('cookie-parser')

require('dotenv').config()


app.set('view engine','ejs')
app.use(express.static(path.join(__dirname+'/public')))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())


app.listen(process.env.PORT,(err)=>{
    if(err)
    {
        console.log(err);
    }
    else
    {   
        app.use("/main-login-project",router);

        // app.use(router);
        console.log(`server listen on http://${process.env.HOST}:${process.env.PORT}`)
    }
})