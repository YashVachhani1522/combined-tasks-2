const express=require('express')
const router=express.Router();
const mysql=require('mysql');
const database = require('../../models/ajax-insert-update-form/database');


const getUser=(async(req,res)=>{
    try{
    const con=new database(process.env.database)

    let page=JSON.parse(req.params.page);
    let data_per_page=10;
    let total_record=200;
    let start=(data_per_page)*(page-1);
       
    let q=`select * from student limit ${data_per_page} offset ${start}`;
    
    let result=await con.executrquery(q);

    if(typeof result=="string")
    {
        console.log(result)
    }
    else
    {
        res.render('pagination-orderby/page.ejs',{pageno:page,res1:result,totalrec:total_record,direction:false}); 
    }
}
catch(e)
{
    res.send(e)
}
})
const getOrderBy=(async(req,res)=>{
        let con=new database(process.env.database)

        let page=JSON.parse(req.params.page);
        let first_name=req.params.first_name;
        let direction=req.params.order;
        console.log(first_name);
        let data_per_page=10;
        let total_record=200;
        let start=(data_per_page)*(page-1);
        
        let q=`select * from student order by ${first_name} ${direction} limit ${data_per_page} offset ${start} `;

        let result=await con.executrquery(q)
        if(typeof result=="string")
        {
            console.log(result)
        }
        else
        {
            res.render('pagination-orderby/page.ejs',{pageno:page,res1:result,totalrec:total_record,direction:direction}); 
        }
})

module.exports={getUser,getOrderBy};