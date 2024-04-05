const connection = require('../../models/insert-update-employee-form/connection');
const serverside = require('../../middlewares/insertupdate');
const database = require('../../models/ajax-insert-update-form/database');

const display = ((req, res)=>{
    res.render("insert-update-employee-form/gridpage.ejs")
})

const getInsert=((req,res)=>{
    res.render('insert-update-employee-form/form.ejs',{id:false});
})

const postInsert=(serverside,async(req,res)=>{
    try{

    let data=req.body;
    // console.log(data);

    let db=new connection(process.env.database)

    let res1=await db.createquery('baisic_details',{
        fname:data.firstname,
        lname:data.lastname,
        designation:data.designation,
        address:data.address1,
        address2:data.address2,
        zip_code:data.zipcode,
        email:data.email,
        phone_number:data.pnumber,
        state:data.state,
        gender:data.gender,
        relationship_status:data.relation_op,
        dob:data.dob,
    })
    // console.log(res1);
    let lastid=res1.insertId;
    // console.log(lastid)
    // console.log(data.ssc[0]);

    res2=await db.createquery('education',{
        can_id:lastid,
        course:'SSC',
        uni_or_board:data.ssc[0],
        passing_year:data.ssc[1],
        percentage:data.ssc[2],
    })
    res2=await db.createquery('education',{
        can_id:lastid,
        course:'HSC',
        uni_or_board:data.hsc[0],
        passing_year:data.hsc[1],
        percentage:data.hsc[2],
    })
    res2=await db.createquery('education',{
        can_id:lastid,
        course:data.ug[0],
        uni_or_board:data.ug[1],
        passing_year:data.ug[2],
        percentage:data.ug[3],
    })
    if(data.pg!=null)
    {
        let res2=await db.createquery('education',{
            can_id:lastid,
            course:data.pg[0],
            uni_or_board:data.pg[1],
            passing_year:data.pg[2],
            percentage:data.pg[3],
        })
    }
    if(data.work1!=null)
    {
        let res2=await db.createquery('work_experience',{
            can_id:lastid,
            company_name:data.work1[0],
            designation:data.work1[1],
            form_date:data.work1[2],
            to_date:data.work1[3]
        })
    }
    if(data.work2!=null)
    {
        let res2=await db.createquery('work_experience',{
            can_id:lastid,
            company_name:data.work2[0],
            designation:data.work2[1],
            form_date:data.work2[2],
            to_date:data.work2[3]
        })
    }
    if(data.work3!=null)
    {
        let res2=await db.createquery('work_experience',{
            can_id:lastid,
            company_name:data.work3[0],
            designation:data.work3[1],
            form_date:data.work3[2],
            to_date:data.work3[3]
        })
    }

    let w=null,r=null,s=null;
    if(data.hindi!=undefined)
    {
        for(let i=1;i<data.hindi.length;i++)
        {
            if(data.hindi[i]=='r')
            {
                r='read'
            }
            else if(data.hindi[i]=='w')
            {
                w='write'
            }
            else if(data.hindi[i]=='s')
            {
                s='speak'
            }
            
        }
        let res2=await db.createquery('language_known',{
            can_id:lastid,
            languages:data.hindi[0],
            reading:r,
            writes:w,
            speak:s
        })
         }
        if(data.english!=undefined)
        {
            for(let i=1;i<data.english.length;i++)
            {
                if(data.english[i]=='r')
                {
                    r='read'
                }
                else if(data.english[i]=='w')
                {
                    w='write'
                }
                else if(data.english[i]=='s')
                {
                    s='speak'
                }
                
            }
            let res2=await db.createquery('language_known',{
                can_id:lastid,
                languages:data.english[0],
                reading:r,
                writes:w,
                speak:s
            })
         }

         if(data.gujrati!=undefined)
        {
            for(let i=1;i<data.gujrati.length;i++)
            {
                if(data.gujrati[i]=='r')
                {
                    r='read'
                }
                else if(data.gujrati[i]=='w')
                {
                    w='write'
                }
                else if(data.gujrati[i]=='s')
                {
                    s='speak'
                }
                
            }
            let res2=await db.createquery('language_known',{
                can_id:lastid,
                languages:data.gujrati[0],
                reading:r,
                writes:w,
                speak:s
            })
        }
        
        
        //languagesknown

        if(data.php!=undefined)
        {
            let res2=await db.createquery('technologies_know',{
                can_id:lastid,
                technologies_name:data.php[0],
                leveles:data.php[1],
            })
        }
        if(data.mysql!=undefined)
        {
            let res2=await db.createquery('technologies_know',{
                can_id:lastid,
                technologies_name:data.mysql[0],
                leveles:data.mysql[1],
            })
        }

        if(data.laravel!=undefined)
        {
            let res2=await db.createquery('technologies_know',{
                can_id:lastid,
                technologies_name:data.laravel[0],
                leveles:data.laravel[1],
            })
        }
        if(data.oracle!=undefined)
        {
            let res2=await db.createquery('technologies_know',{
                can_id:lastid,
                technologies_name:data.oracle[0],
                leveles:data.oracle[1],
            })
        }


        //work
        if(data.work1!=null)
        {
            let res2=await db.createquery('work_experience',{
                can_id:lastid,
                Company_name:data.work1[0],
                designation:data.work1[1],
                form_date:data.work1[2],
                to_date:data.work1[3],
            })
        }

        if(data.work2!=null)
        {
            let res2=await db.createquery('work_experience',{
                can_id:lastid,
                Company_name:data.work2[0],
                designation:data.work2[1],
                form_date:data.work2[2],
                to_date:data.work2[3],
            })
        }
        if(data.work3!=null)
        {
            let res2=await db.createquery('work_experience',{
                can_id:lastid,
                Company_name:data.work3[0],
                designation:data.work3[1],
                form_date:data.work3[2],
                to_date:data.work3[3],
            })
        }
        if(data.pre1!=null)
        {
            let res2=await db.createquery('`references`',{
                can_id:lastid,
                name:data.pre1[0],
                phone_number:data.pre1[1],
                relation:data.pre1[2],
            })
        }
        // console.log(res2)
        if(data.pre2!=null)
        {
            let res2=await db.createquery('references',{
                can_id:lastid,
                name:data.pre2[0],
                phone_number:data.pre2[1],
                relation:data.pre2[2],
            })
        }
        let loc="";
        
        let res2=await db.createquery('references_contact',{
            can_id:lastid,
            prefered_location:data.pre_loc!=undefined?data.pre_loc.toString():null,
            notice_periods:data.np,
            expected_ctc:data.ectc,
            current_ctc:data.cctc,
            department:data.dept,
        })
        // console.log(res2);
    res.end("form submited.....");
    }
    catch(e)
    {
        res.send(e)
    }
})
const getbasicdetailsdata=(async(req,res)=>{
    try{
        let db=new connection(process.env.database)
        let baisic_details=await db.fatchdata("select can_id,fname,lname,email,phone_number,gender from baisic_details");
        res.send(baisic_details);
    }
    catch(e)
    {
        res.send(e)
    }
})
const getData2=(async(req,res)=>{
   try{

    let id=req.params.id
    // console.log(id);
    let db=new connection(process.env.database)
    let baisic_details=await db.fatchdata2('baisic_details',id);
    console.log(baisic_details)
    let education=await db.fatchdata2('education',id);
    let languages=await db.fatchdata2('language_known',id);
    let tech=await db.fatchdata2('technologies_know',id);
    let ref=await db.fatchdata2('`references`',id);
    let work=await db.fatchdata2('work_experience',id);
    let refcon=await db.fatchdata2('references_contact',id);

    // console.log()
    let obj={
        baisic_details:baisic_details.length<=0?null:baisic_details,
        education:education.length<=0?null:education,
        language:languages.length<=0?null:languages,
        tech:tech.length<=0?null:tech,
        ref:ref.length<=0?null:ref,
        work:work.length<=0?null:work,
        refcon:refcon.length<=0?null:refcon
    }
    if(obj.refcon!=null)
    {
        obj.refcon[0].prefered_location=obj.refcon[0].prefered_location.split(',')  
    }
    console.log(obj);

    res.send(obj);
    }
    catch(e)
    {
        res.send(e)
    }
})
const getDelete=(async(req,res)=>{
    try{

    let id=req.params.id
    let db=new database(process.env.database)
    let res1=await db.delete("references_contact",{can_id:id})
     res1=await db.delete("work_experience",{can_id:id})
     res1=await db.delete("`references`",{can_id:id})
     res1=await db.delete("technologies_know",{can_id:id})
     res1=await db.delete("language_known",{can_id:id})
     res1=await db.delete("education",{can_id:id})
     res1=await db.delete("baisic_details",{can_id:id})

    res.redirect("/insert-update-employee-form/display");
    }
    catch(e)
    {
        res.send(e)
    }
})
module.exports={getInsert,postInsert,getData2,getbasicdetailsdata, display,getDelete};