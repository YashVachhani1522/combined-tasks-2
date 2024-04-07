const database = require('../../models/ajax-insert-update-form/database');

const getUpdateId=((req,res)=>{
  try{
  let id=req.params.id 
  // console.log(id)
  res.render('ajax-insert-update-form/form.ejs',{id:id}); 
  }
  catch(e)
  {
      res.send(e)
  }
})
const postUpdateId=(async(req,res1)=>{
  try{
  let data=req.body;
  let  keys=Object.keys(data)
  keys.forEach(key=>{
      if(data[key].length==0)
      {
          data[key]=null;
      }
  })
  console.log(data)
  let arr=["course","board","passing_year","percentage","company_name","work_designation","from_date","to_date","name","contact","relation"]
  arr.forEach(key=>{
      if(typeof(data[key])=="string")
      {
          data[key]=[data[key]]
      }
  })
//   console.log("++++++++++++++++++++++++++++++++++",data)
  let db=new database(process.env.database);
 

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
  let res=await db.update(obj,"candidate_masters",{id:data.canid})
//   console.log("--------------------------",res)
  let result=await db.executrquery(`select id,candidate_id,course,board,passing_year,percentage from 
  education_details where candidate_id=${data.canid}`);
  let result1=result;
  
  for(let i=0;i<data.course.length;i++)
  {
      let flag=false;
      for(let j=0;j<result.length;j++)
      {
          if(data.course[i]==result[j]["course"])
          {
              flag=true
          }
      }
      if(flag==true)
      {
          let result=await db.update({
              course:data.course[i],
              board:data.board[i],
              passing_year:data.passing_year[i],
              percentage:data.percentage[i],
          },"education_details",{candidate_id:data.canid,course:data.course[i]})
          if(result.affectedRows==0)
          {
              let result=await db.insertdata({
                  candidate_id:data.canid,
                  course:data.course[i],
                  board:data.board[i],
                  passing_year:data.passing_year[i],
                  percentage:data.percentage[i],
              },"education_details")
          }
      }
      else
      {
          let result=await db.delete("education_details",{candidate_id:data.canid,course:data.course[i]});
        //   console.log("yes")
              result=await db.insertdata({
                  candidate_id:data.canid,
                  course:data.course[i],
                  board:data.board[i],
                  passing_year:data.passing_year[i],
                  percentage:data.percentage[i],
              },"education_details")
      }
  }
  // console.log(data.course.length,result.length)
  for(let i=data.course.length;i<result1.length;i++)
  {
      let result=await db.delete("education_details",{candidate_id:data.canid,course:result1[i].course});
  }

  // ---------------------------work ------------------
//   result=await db.executrquery(`select * from work_experiences2 where candidate_id=${data.canid}`);
//   result1=result;
  
//   for(let i=0;i<data.company_name.length;i++)
//   {
//       let flag=false;
//       for(let j=0;j<result.length;j++)
//       {
//           if(data.company_name[i]==result[j]["company_name"])
//           {
//               flag=true
//           }
//       }
//       if(flag==true)
//       {
//           let result=await db.update({
//               company_name:data.company_name[i],
//               work_designation:data.work_designation[i],
//               from_date:data.from_date[i],
//               to_date:data.to_date[i]
//           },"work_experiences2",{candidate_id:data.canid,company_name:data.company_name[i]})
//           if(result.affectedRows==0)
//           {
//               let result=await db.insertdata({
//                   candidate_id:data.canid,
//                   company_name:data.company_name[i],
//                     work_designation:data.work_designation[i],
//                     from_date:data.from_date[i],
//                     to_date:data.to_date[i]
//               },"work_experiences2")
//           }
//       }
//       else
//       {
//           let result=await db.delete("work_experiences2",{candidate_id:data.canid,company_name:data.company_name[i]});
//         //   console.log("yes")
//               result=await db.insertdata({
//                 candidate_id:data.canid,
//                 company_name:data.company_name[i],
//                   work_designation:data.work_designation[i],
//                   from_date:data.from_date[i],
//                   to_date:data.to_date[i]
//             },"work_experiences2")
//       }
//   }
//   // console.log(data.course.length,result.length)
//   for(let i=data.company_name.length;i<result1.length;i++)
//   {
//       let result=await db.delete("work_experiences2",{candidate_id:data.canid,company_name:data.company_name[i]});
//   }


  result=await db.executrquery(`select * from work_experiences2 where candidate_id=${data.canid}`);
  result1=result;
  console.log(data)

    console.log(result1)
  for(let i=0;i<data.company_name.length;i++)
  {
      let flag=false;
      for(let j=0;j<result.length;j++)
      {
          if(data.name[i]==result[j]["company_name"])
          {
              flag=true
          }
      }
      if(flag==true)
      {
          let result=await db.update({
              company_name:data.company_name[i],
              work_designation:data.work_designation[i],
              from_date:data.from_date[i],
              to_date:data.to_date[i],
          },"work_experiences2",{candidate_id:data.canid,company_name:data.company_name[i]})
          if(result.affectedRows==0)
          {
              let result=await db.insertdata({
                  candidate_id:data.canid,
                  company_name:data.company_name[i],
                  work_designation:data.work_designation[i],
                  from_date:data.from_date[i],
                  to_date:data.to_date[i],
              },"work_experiences2")
          }
      }
      else
      {

          let result=await db.delete("work_experiences2",{candidate_id:data.canid,company_name:data.company_name[i]});
          // console.log("yes")
              result=await db.insertdata({
                  candidate_id:data.canid,
                  company_name:data.company_name[i],
                  work_designation:data.work_designation[i],
                  from_date:data.from_date[i],
                  to_date:data.to_date[i],
              },"work_experiences2")
            //   console.log(result)
      }
  }
  for(let i=data.company_name.length;i<result1.length;i++)
  {
      let result=await db.delete("work_experiences2",{candidate_id:data.canid,company_name:result1[i].company_name});
      console.log(result)
  }

  // -------------------- references --------------------
  result=await db.executrquery(`select * from reference_contacts where candidate_id='${data.canid}'`);
  result1=result;
  console.log(result1);
  for(let i=0;i<data.name.length;i++)
  {
      let flag=false;
      for(let j=0;j<result.length;j++)
      {
          if(data.name[i]==result[j]["name"])
          {
              flag=true
          }
      }
      if(flag==true)
      {
          let result=await db.update({
              name:data.name[i],
              contact:data.contact[i],
              relation:data.relation[i],
          },"reference_contacts",{candidate_id:data.canid,name:data.name[i]})
          if(result.affectedRows==0)
          {
              let result=await db.insertdata({
                  candidate_id:data.canid,
                  name:data.name[i],
                  contact:data.contact[i],
                  relation:data.relation[i],
              },"reference_contacts")
          }
      }
      else
      {
          let result=await db.delete("reference_contacts",{candidate_id:data.canid,name:data.name[i]});
          // console.log("yes")
              result=await db.insertdata({
                  candidate_id:data.canid,
                  name:data.name[i],
                  contact:data.contact[i],
                  relation:data.relation[i],
              },"reference_contacts")
      }
  }
  for(let i=data.name.length;i<result1.length;i++)
  {
      let result=await db.delete("reference_contacts",{candidate_id:data.canid,name:result1[i].name});
  }


  // languages

  arr=["hindi","english","gujrati"]
  let language=[]
  arr.forEach(key =>{
      if(data[key]!=undefined)
      {
          arr=data[key]
          language.push(key)
          data[key]=JSON.stringify(arr.slice(1,arr.length))
      }        
  })
//   console.log(data,language)
  result=await db.executrquery(`select * from languages where candidate_id=${data.canid}`);
  result1=result;
  
  for(let i=0;i<language.length;i++)
  {
      let flag=false;
      for(let j=0;j<result.length;j++)
      {
          if(language[i]==result[j]["language"])
          {
              flag=true
          }
      }
      if(flag==true)
      {
          let result=await db.update({
              language:language[i],
              language_lvl:data[language[i]]
          },"languages",{candidate_id:data.canid,language:language[i]})
          if(result.affectedRows==0)
          {
              let result=await db.insertdata({
                  candidate_id:data.canid,
                  language:language[i],
                  language_lvl:data[language[i]],
              },"languages")
          }
      }
      else
      {
          let result=await db.delete("languages",{candidate_id:data.canid,language:language[i]});
          // console.log("yes")
              result=await db.insertdata({
                  candidate_id:data.canid,
                  language:language[i],
                  language_lvl:data[language[i]],
              },"languages")
      }
  }
  for(let i=language.length;i<result1.length;i++)
  {
      let result=await db.delete("languages",{candidate_id:data.canid,language:result1[i]["language"]});
  }
  
  // ----------------technologies-------------------//
  arr=["php","laravel","oracle","mysql"]
  let tech=[]
  arr.forEach(key =>{
      if(data[key]!=undefined)
      {
          arr=data[key]
          tech.push(key)
          data[key]=JSON.stringify(arr.slice(1,arr.length))
      }        
  })
  // console.log(data,language)
  result=await db.executrquery(`select * from technologies where candidate_id=${data.canid}`);
  result1=result;
  
  for(let i=0;i<tech.length;i++)
  {
      let flag=false;
      for(let j=0;j<result.length;j++)
      {
          if(tech[i]==result[j]["technology"])
          {
              flag=true
          }
      }
      if(flag==true)
      {
          let result=await db.update({
              technology:tech[i],
              technology_lvl:data[tech[i]]
          },"technologies",{candidate_id:data.canid,technology:tech[i]})
          if(result.affectedRows==0)
          {
              let result=await db.insertdata({
                  candidate_id:data.canid,
                  technology:tech[i],
              technology_lvl:data[tech[i]],
              },"technologies")
          }
      }
      else
      {
          let result=await db.delete("technologies",{candidate_id:data.canid,technology:tech[i]});
          // console.log("yes")
               result=await db.insertdata({
                  candidate_id:data.canid,
                  technology:tech[i],
                  technology_lvl:data[tech[i]],
              },"technologies")
      }
  }
  for(let i=tech.length;i<result1.length;i++)
  {
      let result=await db.delete("technologies",{candidate_id:data.canid,language:result1[i]["technology"]});
  }
  res1.send({error: "data is updated...."})
//   response.send(result);
}
  catch(error)
  {
    res1.send(error)
  }
})
module.exports={getUpdateId,postUpdateId}