const express=require('express');
const database = require('../../models/ajax-insert-update-form/database');
const router=express.Router();


const getSearch=((req,res)=>{
    let db=new database(process.env.database);
    let onlyid=req.query.id2;
    let op=req.query.select;
    
    let std_id=req.query.std_id;
    let first_name=req.query.first_name;
    let last_name=req.query.last_name;
    let contact=req.query.contact;
    let email=req.query.email;
    let gender=req.query.gender;
    // let def=[]
    // console.log(op);


    // console.log();
    try{
            let data=async()=>
            {
                let result;
                if((onlyid)=="")
                {
                    result=await db.executrquery("select * from stdatt_student_master");
                }
                else if(onlyid!=undefined)
                {
                    if(onlyid.trim()!="")
                    {
                        result=await db.executrquery(`select * from stdatt_student_master where std_id=${onlyid}`);
                    }
                    else
                    {
                        result=await db.executrquery("select * from stdatt_student_master");
                    }
                }
                else if(op=='and' && std_id!="" && first_name!="" && last_name!="" && contact!="" && email!="" && gender!="")
                {
                    result=await db.executrquery(`select * from stdatt_student_master where std_id=${std_id} ${op} first_name='${first_name}' ${op} last_name='${last_name}' ${op} contact='${contact}' ${op} email='${email}' ${op} gender='${gender}'`);
                    
                }
                else if(op=='or')
                {
                    result=await db.executrquery(`select * from stdatt_student_master where std_id="${std_id}" ${op} first_name="${first_name}" ${op} last_name="${last_name}" ${op} contact="${contact}" ${op} email="${email}" ${op} gender="${gender}";`)
                }
                else
                {
                    result=await db.executrquery("select * from stdatt_student_master");
                }
                let arr=Object.keys(result[0])
                console.log(result[0])
                res.render("perticular-search-and-or/page1.ejs",{data:result,fields:arr,error:false});
            }
            data();
        }   
    catch(err){
        res.render("perticular-search-and-or/page1.ejs",{data:false,fields:false,error:err});
        }

})


module.exports=getSearch;