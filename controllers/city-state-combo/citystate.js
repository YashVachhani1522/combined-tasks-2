const express=require('express');
const database = require('../../models/ajax-insert-update-form/database');
// const database = require('./package/database');
const router=express.Router()

const getDemo=((req,res)=>{
    res.render('city-state-combo/demo.ejs')
})
const getState=(async(req,res)=>{
    try{
    let obj=new database(process.env.database);
    let ans=await obj.executrquery('select * from states');
    console.log(ans)
    res.send(ans);
    }
    catch(e)
    {
        res.send(e)
    }
})

const getCity=(async(req,res)=>{
    try{

    let obj=new database(process.env.database);
    let ans=await obj.executrquery('select * from cities');
    res.send(ans);
    }
    catch(e)
    {
        res.send(e)
    }
})
const getCityId=(async(req,res)=>{
    try{
    let obj=new database(process.env.database);
    let ans=await obj.executrquery(`select * from cities where state_id=${req.params.id}`);
    res.send(ans);
    }
    catch(e)
    {
        res.send(e)
    }
})

module.exports={getDemo,getState,getCity,getCityId}