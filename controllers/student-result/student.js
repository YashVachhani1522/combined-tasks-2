const mysql=require('mysql');

const getResult=((req,res)=>{
            
    var query = require("url").parse(req.url, true).query;
    var data_per_page=10;
    var total_record=200;
    var page=Number(query.page) || 1;
    var start=(data_per_page)*(page-1);
    
    // var mon_year=query.month || '12-2023';
    // var arr=mon_year.split('-');
    // var mon=arr[0];
    // var year=arr[1];

var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Root@123",
    database:"student_27"
});

con.connect((err)=>{
    if(err)console.log(err)
    console.log("conected....");


    var q=`select student_master.std_id,student_master.first_name,
    sum( 
    case 
        when exam_id=1 then theory_mark
        else 0
    end 
    )as ter_theory_mark,
    sum( 
    case 
        when exam_id=1 then practical_mark
        else 0
    end 
    )as ter_practical_mark,
    sum( 
    case 
        when exam_id=2 then theory_mark
        else 0
    end 
    )as pri_theory_mark,
    sum( 
    case 
        when exam_id=2 then practical_mark
        else 0
    end 
    )as pri_practical_mark,
    sum( 
    case 
        when exam_id=3 then theory_mark
        else 0
    end 
    )as final_theory_mark,
    sum( 
    case 
        when exam_id=3 then practical_mark
        else 0
    end 
    )as final_practical_mark,
    sum(
        theory_mark+practical_mark
    )as total_mark
    from result
    left join student_master on
    result.std_id=student_master.std_id
    GROUP BY result.std_id
    limit ${start},${data_per_page};`

    var mypromise=new Promise((resolve,reject)=>{
        con.query(q,(err,result)=>{
            if(err)reject(err);
            else
            {
                resolve(result);
            }
        })
    })
    mypromise.then((data)=>{
        console.log(data);
        res.render('student-result/page1.ejs',{res1:data,totalrec:total_record,pageno:page});
    }).catch((err)=>{
        console.log(err);
    })

})
})
const getResId=((req,res)=>{
var id=Number(req.params.id);


var con=mysql.createConnection({
host:"localhost",
user:"root",
password:"Root@123",
database:"student_27"
});

con.connect((err)=>{
if(err)console.log(err)
console.log("conected....");


var q=`select student_master.std_id,first_name,last_name,
count(attendance.std_id) as no_of_day,
round(count(attendance.std_id)/.3,2) as "percentage"
from student_master left join attendance
on student_master.std_id=attendance.std_id
where attendance="present" and month(attance_date)='12' and year(attance_date)='2023' and attendance.std_id=${id}
group by attendance.std_id 
order by attendance.std_id asc;`

var q2=`select subject_name,subject_id,exam_name,theory_mark,practical_mark
from result
left join subject_master on
result.sub_id=subject_master.subject_id
left join exam_master on
result.exam_id=exam_master.exam_id
where std_id=${id};`

var mypromise=new Promise((resolve,reject)=>{
    con.query(q,(err,result)=>{
        if(err)reject(err);
        else
        {
            resolve(result);
        }
    })
})
mypromise.then((data)=>{
    console.log(data);
    // res.render('page2.ejs',{res1:data});
    var mypromise2=new Promise((resolve,reject)=>{
        con.query(q2,(err,result)=>{
            if(err)reject(err);
            else
            {
                resolve(result);
            }
        })
    })
    mypromise2.then((data2)=>{
        console.log(data2);
        res.render('student-result/page2.ejs',{res2:data2,res1:data});
    }).catch((err)=>{
        console.log(err);
    })
}).catch((err)=>{
    console.log(err);
})
})
})

module.exports={getResult,getResId}