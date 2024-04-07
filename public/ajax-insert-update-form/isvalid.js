const req = (arr) => {
    var arr2 = []
    for (let i = 0; i < arr.length; i++) {
        if (document.getElementById(arr[i]).value.trim() == "") {
            arr2.push(arr[i])
        }
    }
    return arr2;
}
const printerror = (ele, msg) => {
    // console.log(ans)
    // ans.forEach(ele => {
    let parent = document.getElementById(ele).parentNode
    let span = `<span class='text-danger'>${msg}</span>`
    parent.innerHTML += span
    // });    
}
const printerror2 = (ele, msg) => {
    // console.log(ans)
    // ans.forEach(ele => {
    let parent = document.getElementsByName(ele)[0].parentNode
    let span = `<span class='text-danger'>${msg}</span>`
    parent.innerHTML += span
    // });    
}
const removemsg = () => {
    let errors = document.querySelectorAll("span.text-danger")
    errors.forEach(err => {
        err.remove();
    })
}
const checkednum=(arr)=>{
    let arr2=[]
    for(let i=0;i<arr.length;i++)
    {
        if(!isNaN(Number(document.getElementById(arr[i]).value)))
        {
             arr2.push(arr[i])
        }
    }
    return arr2;
}
const checkdynemicbox=(arr)=>{
    let arr2=[]
    for(let i=0;i<arr.length;i++)
    {
        let obj=arr[i];
        // console.log(obj)
        let result=[];
        obj.data.forEach(element =>{
                element=document.getElementsByName(element);
                let row=[]
                element.forEach(single=>{
                    if(single.value.trim()!="")
                    {
                        row.push(single.value)
                    }
                })
                result.push(row);
        })
        let size=result[0].length;
        for(let i=0;i<result.length;i++)
        {
            if(size!=result[i].length)
            {
                arr2.push(obj);
            }
        }

    }
    return arr2;
}
const rg=(id,type)=>{
    let CONTACT = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    let DATE =/\d{4}-\d{2}-\d{2}/
    let YEAR=/(?:(?:19|20)[0-9]{2})/;
    let PER=/(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)/;
    let EMAIL= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    switch(type)
    {
        case 'email':
            if(!document.getElementById(id).value.match(EMAIL))
            {
                return id;
            }
            break;
        case 'mobile':
            if(!document.getElementById(id).value.match(CONTACT))
            {
                return id;
            }
            break;
        case 'date':
            if(!document.getElementById(id).value.match(DATE))
            {
                return id;
            }     
            break;
        case 'year':
            if(!document.getElementById(id).value.match(YEAR))
            {
                return id;
            }     
            break;
        case 'per':
        if(!document.getElementById(id).value.match(PER))
        {
            return id;
        }     
        break;
    }
    return true;
}
const arrayreqvalid=(arr)=>{
    let arr2=[]
    for(let i=0;i<arr.length;i++)
    {
        let obj=arr[i];
        let count=0;
        let inputs=document.getElementsByName(obj.name);

        for(let j=0;j<inputs.length;j++)
        {

            if(obj.type=='text')
            {
                if(inputs[j].value !="")
                {
                    count++;
                }
            }
            else
            {

                if(inputs[j].checked==true)
                {
                    count++;
                }

            }
        }
        // console.log(count); 
        // console.log(obj.size);

        if(obj.required==true && count>=obj.size)
        {
            continue;
        }
        else if(obj.required==false && (count==0 || count>=obj.size)) 
        {
            continue;
        }
        else
        {
            arr2.push(obj);
        }

    }
    return arr2;
}

const isvalid_baisicdetails=(container)=>
{
    let errorArray=[]
    let errorArray2=[]
    removemsg()
    let arr=['first_name','last_name','designation','email','phone_no','birthdate','city','address1','address2']
    let ans=req(arr)
    ans.forEach(item => {
        if (errorArray.indexOf(item) < 0)
            errorArray.push(item);
    })
    let checknum=['first_name','last_name','designation','address1','address2','city']
    
    let checksumans=checkednum(checknum);
    checksumans.forEach(item => {
        if (errorArray.indexOf(item) < 0)
            errorArray.push(item);
    })

    if (rg('email', 'email') == "email") {
        if (errorArray.indexOf("email") < 0)
            errorArray.push("email");
    }
    if (rg('phone_no', 'mobile') == "phone_no") {
        if (errorArray.indexOf("phone_no") < 0)
            errorArray.push("phone_no");
    }
    if (rg('birthdate', 'date') == "birthdate") {
        if (errorArray.indexOf("birthdate") < 0)
            errorArray.push("birthdate");
    }
    if (document.getElementById('male').checked == false && document.getElementById('female').checked == false) {
        if (errorArray.indexOf("gender") < 0)
            errorArray.push("gender");
    }
    
    if (errorArray.length > 0 || errorArray2.length > 0) {
        errorArray.forEach(item => {
            printerror(item, `${item} is invalid..`);
        })
        errorArray2.forEach(ele => {
            console.log(ele)
            printerror2(ele, `${ele} is invalid..`);
        })
        return false;
    }
    return true;
    
}

const isvalid_education=(container)=>{
    let obj=[{
        label:'education',
        data:['course','board','passing_year','percentage'],
        required:false
    }]
    if(checkdynemicbox(obj).length>0)
    {   
        document.getElementById('print-err').style.display='block';
        document.getElementById('print-err').innerHTML=`Enter value for ${checkdynemicbox(obj)[0].label}`; 
        return false ;      
    }   
    return true
}
const isvalid_work=(container)=>{
    let obj=[{
        label:'work',
        data:['company_name','work_designation','from_date','to_date'],
        required:false
    }]
    console.log("ajkdjhfgauikshfskajdghauihknjskdhj")
    console.log(obj)
    if(checkdynemicbox(obj).length>0)
    {   
        document.getElementById('print-err').style.display='block';
        document.getElementById('print-err').innerHTML=`Enter value for ${checkdynemicbox(obj)[0].label}`; 
        return false ;      
    }   
}
const isvalid_ref=()=>{
    let obj=[{
        label:'Refrences',
        data:['name','contact','relation'],
        required:false
    }]
    if(checkdynemicbox(obj).length>0)
    { 
        var ans=checkdynemicbox(obj)
        document.getElementById('print-err').style.display='block';
        document.getElementById('print-err').innerHTML=`Enter value for ${ans[0].label}`; 
        return false ;      
    }   
}
const isvalid_language=()=>{
    removemsg()
    let errorArray=[]
    let errorArray2=[]
    let obj=[
    {
        name:'hindi',
        label:'HINDI',
        required:false,
        type:'select',
        size:'2'
    },
    {
        name:'english',
        label:'ENGLISH',
        required:false,
        type:'select',
        size:'2'
    },
    {
        name:'gujrati',
        label:'GUJRATI',
        required:false,
        type:'select',
        size:'2'
    },]
    let obj2=arrayreqvalid(obj);
    obj2 = obj2.map(item => item.name)
    obj2.forEach(ele => {
        if (errorArray2.indexOf(ele) < 0)
            errorArray2.push(ele)
    })
    if (errorArray.length > 0 || errorArray2.length > 0) {
        errorArray.forEach(item => {
            printerror(item, `${item} is invalid..`);
        })
        errorArray2.forEach(ele => {
            console.log(ele)
            printerror2(ele, `${ele} is invalid..`);
        })
        return false;
    }
    return true;
   
}
const isvalid_tech=()=>{
    removemsg()
    let errorArray2=[]
    let errorArray=[]
    let obj=[
        {
            name:'php',
            label:'PHP',
            required:false,
            size:'2'
        },
        {
            name:'mysql',
            label:'MYSQL',
            required:false,
            type:'select',
            size:'2'
        },
        {
            name:'laravel',
            label:'LARAVEl',
            required:false,
            size:'2'
        },
        {
            name:'oracle',
            label:'ORACLE',
            required:false,
            size:'2'
        },
    ]
    let obj2=arrayreqvalid(obj);
    obj2 = obj2.map(item => item.name)
    obj2.forEach(ele => {
        if (errorArray2.indexOf(ele) < 0)
            errorArray2.push(ele)
    })
    if (errorArray.length > 0 || errorArray2.length > 0) {
        errorArray.forEach(item => {
            printerror(item, `${item} is invalid..`);
        })
        errorArray2.forEach(ele => {
            console.log(ele)
            printerror2(ele, `${ele} is invalid..`);
        })
        return false;
    }
    return true;
}
const isvalid_last=()=>{
    let arr=['prefered_location','expected_ctc','department']
    let ans=req(arr)
    if(ans.length>0)
    {
        console.log(ans)
        document.getElementById('print-err').style.display='block';
        document.getElementById(ans[0]).focus();
        document.getElementById('print-err').innerHTML=`Enter value for ${ans[0]}`; return false ; 
    }
    return true
}
