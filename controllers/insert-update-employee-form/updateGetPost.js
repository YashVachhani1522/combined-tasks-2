const serverside = require("../../middlewares/insertupdate");
const connection = require("../../models/insert-update-employee-form/connection");


const getUpdate=((req,res)=>{
  try{
  let id=req.params.id 
  res.render('insert-update-employee-form/form.ejs',{id:id}); 
  }
  catch(e)
  {
      res.send(e)
  }
})
const postUpdate=(serverside,async(req,res)=>{
  try{

  let data=req.body;
  let obj10={
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
      relationship_status:data.relationop,
      dob:data.dob,
  }
  let conditions={
      can_id:data.canid
  }
  let obj=new connection(process.env.database)
  let result=await obj.update('baisic_details',obj10,conditions);
  let oldres=await obj.fatchdata2('education',data.canid)
   let res2=await obj.update('education',{
      course:'SSC',
      uni_or_board:data.ssc[0],
      passing_year:data.ssc[1],
      percentage:data.ssc[2],
  },{
      can_id:data.canid,
      edu_id:oldres[0].edu_id
  })
   res2=await obj.update('education',{
      course:'HSC',
      uni_or_board:data.hsc[0],
      passing_year:data.hsc[1],
      percentage:data.hsc[2],
  },{
      can_id:data.canid,
      edu_id:oldres[1].edu_id
  })
 
   res2=await obj.update('education',{
      course:data.ug[0],
      uni_or_board:data.ug[1],
      passing_year:data.ug[2],
      percentage:data.ug[3],
  },{
      can_id:data.canid,
      edu_id:oldres[2].edu_id
  })
  // console.log(res2)
  
  if(oldres.length==4 && data.pg!=null)
  {
      let res2=await obj.update('education',{
          course:data.pg[0],
          uni_or_board:data.pg[1],
          passing_year:data.pg[2],
          percentage:data.pg[3],
          
      },{
          can_id:data.canid,
          edu_id:oldres[3].edu_id
      })
  }
  if(oldres.length==3 && data.pg!=null)
  {
      let res2=await obj.createquery('education',{
          can_id:data.canid,
          course:data.pg[0],
          uni_or_board:data.pg[1],
          passing_year:data.pg[2],
          percentage:data.pg[3],
      })
  }
  if(oldres.length==4 && data.pg==null)
  {
      let res2=await obj.delete('education',{
          can_id:data.canid,
          edu_id:oldres[3].edu_id
      })
  }

  // console.log(data);
  let oldwork=await obj.fatchdata2('work_experience',data.canid)
  if(oldwork.length==0 && data.work1!=null)
  {
      let res2=await obj.createquery('work_experience',{
          can_id:data.canid,
          company_name:data.work1[0],
          designation:data.work1[1],
          form_date:data.work1[2],
          to_date:data.work1[3]
      })
  }
  if(oldwork.length==0 && data.work2!=null)
  {
      let res2=await obj.createquery('work_experience',{
          can_id:data.canid,
          company_name:data.work2[0],
          designation:data.work2[1],
          form_date:data.work2[2],
          to_date:data.work2[3]
      })
  }
  if(oldwork.length==0 && data.work3!=null )
  {
      let res2=await obj.createquery('work_experience',{
          can_id:data.canid,
          company_name:data.work3[0],
          designation:data.work3[1],
          form_date:data.work3[2],
          to_date:data.work3[3]
      })
  }
  if(oldwork.length==1 && data.work2!=null)
  {
      let res2=await obj.createquery('work_experience',{
          can_id:data.canid,
          company_name:data.work2[0],
          designation:data.work2[1],
          form_date:data.work2[2],
          to_date:data.work2[3]
      })
  }
  if(oldwork.length==1 && data.work3!=null )
  {
      let res2=await obj.createquery('work_experience',{
          can_id:data.canid,
          company_name:data.work3[0],
          designation:data.work3[1],
          form_date:data.work3[2],
          to_date:data.work3[3]
      })
  }
  if(oldwork.length==2 && data.work3!=null )
  {
      let res2=await obj.createquery('work_experience',{
          can_id:data.canid,
          company_name:data.work3[0],
          designation:data.work3[1],
          form_date:data.work3[2],
          to_date:data.work3[3]
      })
  }
  if(oldwork.length==3 && data.work1!=null && data.work2!=null && data.work3!=null)
  {
      let res2=await obj.update('work_experience',{
          company_name:data.work3[0],
          designation:data.work3[1],
          form_date:data.work3[2],
          to_date:data.work3[3]
      },{
          can_id:data.canid,
          work_id:oldwork[2].work_id
      })

       res2=await obj.update('work_experience',{
          company_name:data.work2[0],
          designation:data.work2[1],
          form_date:data.work2[2],
          to_date:data.work2[3]
      },{
          can_id:data.canid,
          work_id:oldwork[1].work_id
      })
       res2=await obj.update('work_experience',{
          company_name:data.work1[0],
          designation:data.work1[1],
          form_date:data.work1[2],
          to_date:data.work1[3]
      },{
          can_id:data.canid,
          work_id:oldwork[0].work_id
      })
  }
  if(oldwork.length==2 && data.work1!=null && data.work2!=null)
  {
      let res2=await obj.update('work_experience',{
          company_name:data.work2[0],
          designation:data.work2[1],
          form_date:data.work2[2],
          to_date:data.work2[3]
      },{
          can_id:data.canid,
          work_id:oldwork[1].work_id
      })
      // console.log(res2)
       res2=await obj.update('work_experience',{
          company_name:data.work1[0],
          designation:data.work1[1],
          form_date:data.work1[2],
          to_date:data.work1[3]
      },{
          can_id:data.canid,
          work_id:oldwork[0].work_id
      })
  }
  // console.log(oldwork.length)
  if(oldwork.length==1 && data.work1!=null)
  {
      // console.log('no')
      let res2=await obj.update('work_experience',{
          company_name:data.work1[0],
          designation:data.work1[1],
          form_date:data.work1[2],
          to_date:data.work1[3]
      },{
          can_id:data.canid,
          work_id:oldwork[0].work_id
      })
  }
  if(oldwork.length==3 && data.work1==null && data.work2==null && data.work3==null)
  {
      let res2=await obj.delete('work_experience',{
          can_id:data.canid,
          work_id:oldwork[0].work_id
      })
      res2=await obj.delete('work_experience',{
          can_id:data.canid,
          work_id:oldwork[1].work_id
      })
      res2=await obj.delete('work_experience',{
          can_id:data.canid,
          work_id:oldwork[2].work_id
      })
  }

  if(oldwork.length==2 && (data.work1==null || data.work2==null) )
  {
      if(data.work1==null)
      {
          let res2=await obj.delete('work_experience',{
              can_id:data.canid,
              work_id:oldwork[0].work_id
          })
      }
      if(data.work2==null)
      {
          let res2=await obj.delete('work_experience',{
              can_id:data.canid,
              work_id:oldwork[1].work_id
          })
          // console.log(res2)
      }
      if(data.work1==null && data.work2==null)
      {
          let res2=await obj.delete('work_experience',{
              can_id:data.canid,
              work_id:oldwork[0].work_id
          })
          res2=await obj.delete('work_experience',{
              can_id:data.canid,
              work_id:oldwork[1].work_id
          })
      }
  }
  if(oldwork.length==1 && data.work1==null)
  {
      let res2=await obj.delete('work_experience',{
          can_id:data.canid,
          work_id:oldwork[0].work_id
      })
  }
  let oldpre=await obj.fatchdata2('`references`',data.canid)
  // console.log(oldpre)
  if(oldpre.length==2 && (data.pre1!=null && data.pre2!=null))
  {
      
      let res2=await obj.update('`references`',{
          name:data.pre1[0],
          phone_number:data.pre1[1],
          relation:data.pre1[2],
      },{
          can_id:data.canid, 
      })

      res2=await obj.update('`references`',{
          name:data.pre2[0],
          phone_number:data.pre2[1],
          relation:data.pre2[2],
      },{
          can_id:data.canid, 
      })
  }
  if(oldpre.length==1 && data.pre1!=null)
  {
      let res2=await obj.update('`references`',{
          name:data.pre1[0],
          phone_number:data.pre1[1],
          relation:data.pre1[2],
      },{
          can_id:data.canid, 
      })
  }
  if(oldpre.length==2 && (data.pre1==null && data.pre2==null))
  {
      let res2=await obj.delete('`references`',{
          can_id:data.canid,
          name:oldpre[0].name
      })
      res2=await obj.delete('`references`',{
          can_id:data.canid,
          name:oldpre[1].name
      })
  }
  if(oldpre.length==1 && data.pre1==null)
  {
      let res2=await obj.delete('`references`',{
          can_id:data.canid,
          name:oldpre[0].name
      })
  }
  if(oldpre.length==0)
  {
      if(data.pre1!=null)
      {
          let res2=await obj.createquery('`references`',{
              can_id:data.canid,
              name:data.pre1[0],
              phone_number:data.pre1[1],
              relation:data.pre1[2],
          })
      }
      if(data.pre2!=null)
      {
          let res2=await obj.createquery('`references`',{
              can_id:data.canid,
              name:data.pre2[0],
              phone_number:data.pre2[1],
              relation:data.pre2[2],
          })
      }
  }
  if(oldpre.length==1)
  {
      if(data.pre2!=null)
      {
          let res2=await obj.createquery('`references`',{
              can_id:data.canid,
              name:data.pre2[0],
              phone_number:data.pre2[1],
              relation:data.pre2[2],
          })
      }
      // console.log(res2)
  }

  
  
  res2=await obj.update('references_contact',{
      prefered_location:data.pre_loc!=undefined?data.pre_loc.toString():null,
      notice_periods:data.np,
      expected_ctc:data.ectc,
      current_ctc:data.cctc,
      department:data.dept,
  },{
      can_id:data.canid, 
  })
  // console.log(res2);


  let oldlang=await obj.fatchdata2('language_known',data.canid)

  // console.log(oldlang);
  if(oldlang.length>0)
  {
      for(let i=0;i<oldlang.length;i++)
      {
          let ans=await obj.delete('language_known',{
              can_id:data.canid,
              lang_id:oldlang[i].lang_id

          })
      }
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
      console.log(r,w,s)
      let res2=await obj.createquery('language_known',{
          can_id:data.canid,
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
          let res2=await obj.createquery('language_known',{
              can_id:data.canid,
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
          let res2=await obj.createquery('language_known',{
              can_id:data.canid,
              languages:data.gujrati[0],
              reading:r,
              writes:w,
              speak:s
          })
      }
  let oldtech=await obj.fatchdata2('technologies_know',data.canid)
      
      if(oldtech.length>0)
      {
          for(let i=0;i<oldtech.length;i++)
          {
              let ans=await obj.delete('technologies_know',{
                  can_id:data.canid,
                  tech_id:oldtech[i].tech_id
              })
              // console.log(ans);
          }
      }
      if(data.php!=undefined)
      {
          let res2=await obj.createquery('technologies_know',{
              can_id:data.canid,
              technologies_name:data.php[0],
              leveles:data.php[1],
          })
      }
      if(data.mysql!=undefined)
      {
          let res2=await obj.createquery('technologies_know',{
              can_id:data.canid,
              technologies_name:data.mysql[0],
              leveles:data.mysql[1],
          })
      }

      if(data.laravel!=undefined)
      {
          let res2=await obj.createquery('technologies_know',{
              can_id:data.canid,
              technologies_name:data.laravel[0],
              leveles:data.laravel[1],
          })
      }
      if(data.oracle!=undefined)
      {
          let res2=await obj.createquery('technologies_know',{
              can_id:data.canid,
              technologies_name:data.oracle[0],
              leveles:data.oracle[1],
          })
      }

      res.send('data updated....')
  }
  catch(e)
  {
      res.send(e)
  }
}) 
module.exports={getUpdate,postUpdate}