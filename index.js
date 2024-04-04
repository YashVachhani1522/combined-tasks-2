const express=require('express');
const path = require('path');
const app=express();
var cookieParser = require('cookie-parser');
const router = require('./routes/router');

    

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
        app.use(router)
        console.log(`server listen on http://${process.env.HOST}:${process.env.PORT}`)
    }
})