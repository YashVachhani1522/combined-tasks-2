const database = require('../../models/ajax-insert-update-form/database');
// const database = require('./package/database');

const getForm=((req,res)=>{
    res.render('ajax-insert-update-form/form.ejs',{id:false})
})

const postForm=(async(req,res)=>{
    try{

    let data=req.body;
   let db=new database(process.env.database)
//    console.log(data)
   obj={
    first_name:data.first_name,
    last_name: data.last_name,
    designation:data.designation,
    email:data.email,
    phone_no:data.phone_no,
    gender:data.gender,
    relationship:data.relationship,
    birthdate:data.birthdate,
    state:data.state,
    city:data.city,
    address:JSON.stringify(data.address),
    prefered_location:JSON.stringify(data.prefered_location),
    notice_period:data.notice_period!=""?data.notice_period:0,
    expected_ctc:data.expected_ctc,
    current_ctc:data.current_ctc!=""?data.current_ctc:0,
    department:data.department
   }
   let resset=await db.insertdata(obj,'candidate_masters');
//    console.log(resset)
//    console.log(resset);
   let lastid=resset.insertId;

   if(data.course!=undefined)
   {
        if(typeof(data.course)=="string")
        {
            let obj2={
                candidate_id:lastid,
                course:data.course,
                board:data.board,
                passing_year:data.passing_year,
                percentage:data.percentage,
            }
            db.insertdata(obj2,'education_details');
        } 
        else
        {
            for(let i=0;i<data.course.length;i++)
            {
                 let obj2={
                     candidate_id:lastid,
                     course:data.course[i],
                     board:data.board[i],
                     passing_year:data.passing_year[i],
                     percentage:data.percentage[i],
                 }
                 db.insertdata(obj2,'education_details');
             }
        }
   }

    if(data.company_name!=undefined)
    {
        if(typeof(data.company_name)=="string")
        {
            let obj2={
                candidate_id:lastid,
                company_name:data.company_name,
                work_designation:data.work_designation,
                from_date:data.from_date,
                to_date:data.to_date,
            }
            db.insertdata(obj2,'work_experiences2');
        }
        else
        {
            for(let i=0;i<data.company_name.length;i++)
             {
             let obj2={
                 candidate_id:lastid,
                 company_name:data.company_name[i],
                 work_designation:data.work_designation[i],
                 from_date:data.from_date[i],
                 to_date:data.to_date[i],
             }
             db.insertdata(obj2,'work_experiences2');
            }
        }
        
    }
    let language=[]
                                
   if(data.gujrati!=undefined)
   {
        language.push(data.gujrati);
   }
   if(data.hindi!=undefined)
   {
        language.push(data.hindi);
   }
   if(data.english!=undefined)
   {
        language.push(data.english);
   }
    obj={}
    
    for(let i=0;i<language.length;i++)
    {
        let arr=language[i]
        obj.candidate_id=lastid,
        obj.language=arr[0];
        arr=arr.slice(1)
        obj.language_lvl=JSON.stringify(arr);    
        db.insertdata(obj,'languages');
    }

    let tech=[]
    if(data.php!=undefined)
    {
        tech.push(data.php)
    }
    if(data.mysql!=undefined)
    {
        tech.push(data.mysql)
    }
    if(data.oracle!=undefined)
    {
        tech.push(data.oracle)
    }
    if(data.laravel!=undefined)
    {
        tech.push(data.laravel)
    }
    obj={}
    for(let i=0;i<tech.length;i++)
    {
        let arr=tech[i];
        obj.candidate_id=lastid
        obj.technology=arr[0]
        obj.technology_lvl=JSON.stringify([arr[1]])
        db.insertdata(obj,'technologies');

    }
    if(data.name!=undefined)
    {
        if(typeof(data.name)=='string')
        {
            let obj2={
                candidate_id:lastid,
                name:data.name,
                contact:data.contact,
                relation:data.relation
            }
            db.insertdata(obj2,'reference_contacts');
        }
        else
        {
            for(let i=0;i<data.name.length;i++)
            {
                let obj2={
                    candidate_id:lastid,
                    name:data.name[i],
                    contact:data.contact[i],
                    relation:data.relation[i]
                }
                db.insertdata(obj2,'reference_contacts');
            }
        }
        
    }
    res.redirect("/display");
}
catch(e)
{
    res.send(e)
}
})
const getData=(async(req,res)=>{
    try{
        let db=new database(process.env.database)
        let res2=await db.executrquery("select id,first_name,last_name,email,phone_no,gender from candidate_masters");
        res.send(res2);
    }
    catch(e)
    {
        res.send(e)
    }
})


const getDisplay=(async(req,res)=>{
    res.render('ajax-insert-update-form/gridpage.ejs')
})

const getDeleteId=(async(req,res)=>{
    try{
    id=req.params.id
    // console.log(id)
    let db=new database(process.env.database);
    db.delete('education_details',{candidate_id:id})
    db.delete('languages',{candidate_id:id})
    db.delete('reference_contacts',{candidate_id:id})
    db.delete('work_experiences2',{candidate_id:id})
    db.delete('technologies',{candidate_id:id})
    db.delete('candidate_masters',{id:id})
    res.redirect("/ajax-form/display")
    }
    catch(e)
    {
        res.send(e)
    }
})
const getDataId=(async(req,res)=>{
    try{
    let id=req.params.id
    let db=new database(process.env.database)
    let candidate_masters=await db.executrquery(`select * from candidate_masters where id=${id}`);

    // console.log(candidate_masters);

    let education_details=await db.executrquery(`select course,board,passing_year,percentage from education_details where candidate_id=${id}`);
    // console.log(education_details)
    let languages=await db.executrquery(`select language,language_lvl from languages where candidate_id=${id}`);
    languages.forEach(element => {
            element["language_lvl"]=JSON.parse(element["language_lvl"]);
    });
    let technologies=await db.executrquery(`select technology,technology_lvl from technologies where candidate_id=${id}`);
    // console.log(technologies)
    technologies.forEach(element => {
        // console.log(element["technology_lvl"])
        element["technology_lvl"]=JSON.parse(element["technology_lvl"]);
});
    let reference_contacts=await db.executrquery(`select name,contact,relation from reference_contacts where candidate_id=${id}`);
    let work_experiences=await db.executrquery(`select company_name,work_designation,from_date,to_date from work_experiences2 where candidate_id=${id}`);
     
    let obj={
        candidate_masters:candidate_masters.length<=0?null:candidate_masters,
        education_details:education_details.length<=0?null:education_details,
        languages:languages.length<=0?null:languages,
        technologies:technologies.length<=0?null:technologies,
        reference_contacts:reference_contacts.length<=0?null:reference_contacts,
        work_experiences:work_experiences.length<=0?null:work_experiences,
    }
    res.send(obj)
    }
    catch(e)
    {
        res.send(e)
    }
})
module.exports={getForm,postForm,getData,getDisplay,getDeleteId,getDataId}